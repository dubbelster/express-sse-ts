"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SSE {
    constructor(retryTime = 5000) {
        this.clients = [];
        this.init = this._init.bind(this);
        this.send = this._send.bind(this);
        this.retryTime = retryTime;
    }
    _init(req, res, next) {
        res.set({
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive'
        });
        res.flushHeaders();
        // Tell the client to retry every x miliseconds if connectivity is lost
        if (this.retryTime)
            res.write(`retry: ${this.retryTime}\n\n`);
        // res.write(`retry: 10000\n\n`);
        const clientId = Date.now();
        this.clients.push({
            id: clientId,
            res: res
        });
        req.once('close', () => {
            for (let i = 0; i < this.clients.length; i++) {
                if (this.clients[i].id == clientId) {
                    this.clients.splice(i, 1);
                    break;
                }
            }
        });
        next();
    }
    _send(data, eventName, id) {
        this.clients.forEach(c => {
            if (eventName)
                c.res.write(`event: ${eventName}\n`);
            if (id)
                c.res.write(`id: ${id}\n`);
            c.res.write(`data: ${data}\n\n`);
        });
    }
}
exports.default = SSE;
