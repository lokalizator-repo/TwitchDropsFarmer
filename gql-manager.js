/**
 * GraphQL Manager
 * Loads queries from gql-queries.json (Postman-style collection)
 * Centralizes all Twitch GQL communication
 */

const fs = require('fs');
const path = require('path');

class GraphQLManager {
  constructor() {
    this.queries = {};
    this.collectionPath = path.join(__dirname, 'gql-queries.json');
    this._loadCollection();
  }

  _loadCollection() {
    try {
      const raw = fs.readFileSync(this.collectionPath, 'utf8');
      const collection = JSON.parse(raw);
      this.queries = collection.queries || {};
      console.log(`[GQL] Loaded ${Object.keys(this.queries).length} queries from collection`);
    } catch (e) {
      console.error(`[GQL] Failed to load collection: ${e.message}`);
      this.queries = {};
    }
  }

  /**
   * Build a query payload, merging variables from collection with overrides
   */
  buildPayload(operationName, variableOverrides = {}) {
    const template = this.queries[operationName];
    if (!template) {
      throw new Error(`[GQL] Query "${operationName}" not found in collection`);
    }

    const payload = { operationName: template.operationName || operationName };

    // Merge variables
    if (template.variables || variableOverrides) {
      payload.variables = { ...(template.variables || {}), ...variableOverrides };
    }

    // Use persisted query hash if available
    if (template.extensions?.persistedQuery) {
      payload.extensions = { persistedQuery: { ...template.extensions.persistedQuery } };
    }

    // Use raw query string if provided (fallback for queries without hash)
    if (template.query) {
      payload.query = template.query;
    }

    return payload;
  }

  /**
   * Execute a GQL query with full error handling, timeout, and retry
   */
  async execute(operationName, variables, headers, options = {}) {
    const { timeout = 15000, retries = 2, arrayWrap = false } = options;

    let payload;
    try {
      payload = this.buildPayload(operationName, variables);
    } catch (e) {
      return { error: e.message };
    }

    const body = arrayWrap ? JSON.stringify([payload]) : JSON.stringify(payload);

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        const res = await fetch('https://gql.twitch.tv/gql', {
          method: 'POST',
          headers,
          body,
          signal: controller.signal
        });

        clearTimeout(timer);
        const text = await res.text();
        const data = JSON.parse(text);

        // Check for integrity errors
        if (data.errors?.some(e => e.message?.includes('integrity'))) {
          console.error(`[GQL] ${operationName}: Integrity check failed`);
          return { error: 'INTEGRITY_REQUIRED', details: data.errors };
        }

        // Check for persisted query not found (hash expired)
        if (data.errors?.some(e => e.message?.includes('PersistedQueryNotFound'))) {
          console.error(`[GQL] ${operationName}: Hash expired! Update gql-queries.json`);
          return { error: 'HASH_EXPIRED', operationName };
        }

        return data;
      } catch (e) {
        if (attempt === retries) {
          console.error(`[GQL] ${operationName}: All ${retries + 1} attempts failed: ${e.message}`);
          return { error: e.message };
        }
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        console.log(`[GQL] ${operationName}: Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }

  /**
   * Reload collection from disk (hot-reload support)
   */
  reload() {
    this._loadCollection();
  }
}

module.exports = GraphQLManager;
