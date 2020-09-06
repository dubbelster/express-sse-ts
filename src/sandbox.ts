import SSE from "./index";
import express from "express"
import * as path from "path";

const app = express();
const sse = new SSE(); // Create SSE instance.

// Send HTML page to client
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'sandbox.html'));
})

// '/events' is the URL for the EventSource in the client.
app.get('/events', sse.init); // The init() function sets up the connection between the server and the client

// Send a message every second to the clients using SSE!
let counter = 0;
setInterval(() => {
    // Sends message to all connected clients!
    sse.send(`Message #${counter++}`);

    // All options for sending a message:
    sse.send('data: string', 'eventName?: string', 'id?: string | number | undefined')
}, 1000);

// Spin up the server!
app.listen(3000, () => {
    console.log('Express app listening on http://localhost:3000.')
});