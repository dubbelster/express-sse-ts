# express-sse-ts

Strongly typed server sent events module for express.
This modules is used as express middleware.

Because the module is strongly typed you'll have usefull helpers while coding!
This does not mean you have to use TypeScript for it to work.
Both TypeScript and JavaScript will work!

![Screenshot of usefull helper!](https://raw.githubusercontent.com/dubbelster/express-sse-ts/master/README%20assets/codingExample.png)

I am happy to help if you encounter any problems!

## Installation

```
npm i express-sse-ts
```


## Usage

If you want to see a more extensive example, look at the [example source code](https://github.com/dubbelster/express-sse-ts-example)

### Server
```javascript
import SSE from "express-sse-ts";
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
```

### Client
```javascript
const display = document.getElementById('display');
const es = new EventSource('/events'); // Create EventSource

// Listen to event with name 'message'
es.onmessage = event => {
    // Do something width event.
}

// Listen to event with name 'eventName'
es.addEventListener('eventName', event => {
    // Do something width event.
});
```