/**
 * Twitch PubSub WebSocket Manager
 * Connects to wss://pubsub-edge.twitch.tv/v1
 * Subscribes to user-drop-events for real-time drop progress
 */

const WebSocket = require('ws');

class TwitchWebSocketManager {
  constructor() {
    this.socket = null;
    this.userId = null;
    this.authToken = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.pingInterval = null;
    this.listeners = new Map();
    this.isConnected = false;
    this.subscribed = false;
  }

  /**
   * Connect to Twitch PubSub with the given user credentials
   */
  connect(userId, authToken) {
    if (this.isConnected) {
      console.log('[WS] Already connected, disconnecting first...');
      this.disconnect();
    }

    this.userId = userId;
    // Strip "OAuth " prefix if present
    this.authToken = authToken.replace('OAuth ', '');
    this.subscribed = false;

    try {
      this.socket = new WebSocket('wss://pubsub-edge.twitch.tv/v1');

      this.socket.on('open', () => {
        console.log('[WS] Connected to Twitch PubSub');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this._startPingLoop();
        this._subscribeToDropEvents();
      });

      this.socket.on('message', (raw) => {
        try {
          const message = JSON.parse(raw.toString());
          this._handleMessage(message);
        } catch (e) {
          console.error('[WS] Failed to parse message:', e.message);
        }
      });

      this.socket.on('error', (error) => {
        console.error('[WS] Error:', error.message);
      });

      this.socket.on('close', (code, reason) => {
        console.log(`[WS] Disconnected (code: ${code})`);
        this.isConnected = false;
        this._stopPingLoop();
        this._attemptReconnect();
      });
    } catch (error) {
      console.error('[WS] Connection failed:', error.message);
      this._attemptReconnect();
    }
  }

  /**
   * Subscribe to drop-related events for the current user
   */
  _subscribeToDropEvents() {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;

    const topics = [
      `user-drop-events.${this.userId}`
    ];

    const payload = {
      type: 'LISTEN',
      nonce: this._generateNonce(),
      data: {
        topics: topics,
        auth_token: this.authToken
      }
    };

    this.socket.send(JSON.stringify(payload));
    console.log(`[WS] Subscribing to topics: ${topics.join(', ')}`);
  }

  /**
   * Handle incoming PubSub messages
   */
  _handleMessage(message) {
    const { type } = message;

    switch (type) {
      case 'PONG':
        // Server is alive
        break;

      case 'RESPONSE':
        if (message.error) {
          console.error(`[WS] Subscription error: ${message.error}`);
        } else {
          console.log('[WS] Subscription successful');
          this.subscribed = true;
        }
        break;

      case 'MESSAGE':
        this._handleDataMessage(message.data);
        break;

      case 'RECONNECT':
        console.log('[WS] Server requested reconnect');
        this.disconnect();
        setTimeout(() => this.connect(this.userId, this.authToken), 1000);
        break;

      default:
        console.log(`[WS] Unknown message type: ${type}`);
    }
  }

  /**
   * Handle data messages (drop progress, claims, etc.)
   */
  _handleDataMessage(data) {
    if (!data || !data.topic || !data.message) return;

    try {
      const payload = JSON.parse(data.message);
      const topic = data.topic;

      if (topic.includes('user-drop-events')) {
        this._handleDropEvent(payload);
      }
    } catch (e) {
      console.error('[WS] Failed to parse data message:', e.message);
    }
  }

  /**
   * Handle drop-specific events
   */
  _handleDropEvent(payload) {
    const eventType = payload.type || payload.event_type;

    switch (eventType) {
      case 'drop-progress':
        this.emit('drop-progress', {
          dropId: payload.data?.drop_id || payload.drop_id,
          currentProgress: payload.data?.current_progress_min || payload.current_progress_min,
          requiredProgress: payload.data?.required_progress_min || payload.required_progress_min,
          channelId: payload.data?.channel_id || payload.channel_id,
          raw: payload
        });
        break;

      case 'drop-claim':
        this.emit('drop-claim', {
          dropId: payload.data?.drop_id || payload.drop_id,
          raw: payload
        });
        break;

      case 'drop-progress-update':
        // Alternative event name Twitch sometimes uses
        this.emit('drop-progress', {
          dropId: payload.data?.drop_id || payload.drop_id,
          currentProgress: payload.data?.current_progress_min || payload.current_progress_min,
          requiredProgress: payload.data?.required_progress_min || payload.required_progress_min,
          raw: payload
        });
        break;

      default:
        // Unknown drop event - still emit it for debugging
        this.emit('drop-event', { type: eventType, raw: payload });
        console.log(`[WS] Unknown drop event type: ${eventType}`, JSON.stringify(payload).substring(0, 300));
    }
  }

  /**
   * Keepalive ping every 4 minutes (Twitch requires < 5 min)
   */
  _startPingLoop() {
    this._stopPingLoop();
    this.pingInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: 'PING' }));
      }
    }, 4 * 60 * 1000);

    // Send first ping immediately
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'PING' }));
    }
  }

  _stopPingLoop() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  /**
   * Exponential backoff reconnection
   */
  _attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[WS] Max reconnect attempts reached. Giving up.');
      this.emit('disconnected', { permanent: true });
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    console.log(`[WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

    setTimeout(() => {
      if (this.userId && this.authToken) {
        this.connect(this.userId, this.authToken);
      }
    }, delay);
  }

  _generateNonce() {
    return Math.random().toString(36).substring(2, 15);
  }

  // --- Event emitter ---

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(callback);
  }

  emit(eventName, data) {
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).forEach(cb => cb(data));
    }
  }

  removeAllListeners() {
    this.listeners.clear();
  }

  /**
   * Get current connection status
   */
  getStatus() {
    return {
      connected: this.isConnected,
      subscribed: this.subscribed,
      reconnectAttempts: this.reconnectAttempts,
      userId: this.userId
    };
  }

  /**
   * Cleanly disconnect
   */
  disconnect() {
    this._stopPingLoop();
    this.isConnected = false;
    this.subscribed = false;
    if (this.socket) {
      try {
        this.socket.close();
      } catch (e) {}
      this.socket = null;
    }
  }
}

module.exports = TwitchWebSocketManager;
