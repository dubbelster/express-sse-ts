"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const app = express_1.default();
const sse = new index_1.default(); // Create SSE instance.
// Send HTML page to client
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'sandbox.html'));
});
// '/events' is the URL for the EventSource in the client.
app.get('/events', sse.init); // The init() function sets up the connection between the server and the client
// Send a message every second to the clients using SSE!
let counter = 0;
setInterval(() => {
    // Sends message to all connected clients!
    sse.send(`Message #${counter++}`);
    // All options for sending a message:
    sse.send('data: string', 'eventName?: string', 'id?: string | number | undefined');
}, 1000);
// Spin up the server!
app.listen(3000, () => {
    console.log('Express app listening on http://localhost:3000.');
});
