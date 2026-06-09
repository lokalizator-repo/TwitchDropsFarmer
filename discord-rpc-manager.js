const net = require('net');

class DiscordRPCManager {
  constructor(clientId) {
    this.clientId = clientId;
    this.client = null;
    this.connected = false;
    this.enabled = false;
    this.lastActivity = null;
    this.reconnectTimer = null;
  }

  /**
   * Start and enable RPC connection
   */
  start() {
    this.enabled = true;
    this.connect();
  }

  /**
   * Connect to Discord Named Pipe
   */
  connect() {
    if (this.client || !this.enabled) return;

    let pipeIndex = 0;
    const tryConnect = () => {
      if (!this.enabled) return;
      if (pipeIndex > 9) {
        // Retry connection in 20 seconds if Discord isn't open
        this._scheduleReconnect();
        return;
      }

      const pipePath = `\\\\.\\pipe\\discord-ipc-${pipeIndex}`;
      const socket = net.createConnection(pipePath);

      socket.on('connect', () => {
        console.log(`[Discord RPC] Connected on pipe ${pipeIndex}`);
        this.client = socket;
        this.connected = true;
        
        this._handshake();
        
        // If there was a pending activity, send it after handshake has processed
        if (this.lastActivity) {
          setTimeout(() => this.setActivity(this.lastActivity), 1000);
        }
      });

      socket.on('error', () => {
        socket.destroy();
        pipeIndex++;
        tryConnect();
      });

      socket.on('close', () => {
        if (this.client === socket) {
          console.log('[Discord RPC] Connection closed');
          this.connected = false;
          this.client = null;
          this._scheduleReconnect();
        }
      });
    };

    tryConnect();
  }

  /**
   * Schedule reconnection retry
   */
  _scheduleReconnect() {
    if (this.reconnectTimer || !this.enabled) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, 20000);
  }

  /**
   * Write packet helper
   */
  _send(op, data) {
    if (!this.client || !this.connected) return;
    try {
      const json = JSON.stringify(data);
      const len = Buffer.byteLength(json);
      const header = Buffer.alloc(8);
      header.writeInt32LE(op, 0);
      header.writeInt32LE(len, 4);
      this.client.write(header);
      this.client.write(json);
    } catch (e) {
      console.error('[Discord RPC] Write error:', e.message);
    }
  }

  /**
   * Send Client ID handshake
   */
  _handshake() {
    this._send(0, { v: 1, client_id: this.clientId });
  }

  /**
   * Update current rich presence activity
   */
  setActivity(activity) {
    this.lastActivity = activity;
    if (!this.connected || !this.enabled) return;

    const payload = {
      cmd: 'SET_ACTIVITY',
      args: {
        pid: process.pid,
        activity: activity
      },
      nonce: Math.random().toString()
    };
    this._send(1, payload);
  }

  /**
   * Disable and disconnect RPC
   */
  stop() {
    this.enabled = false;
    this.lastActivity = null;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.client) {
      this.client.destroy();
      this.client = null;
      this.connected = false;
      console.log('[Discord RPC] Disconnected and disabled');
    }
  }
}

module.exports = DiscordRPCManager;
