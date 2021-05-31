const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.get('/', (req, res) => {
    res.send({ "msg": "this server is only usable with socket" })
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

/* MiddleWare to save if device or robot connection */
io.use((socket, next) => {
    const type = socket.handshake.auth.device;

    console.log("Attempt connection");
    if (type === "robot") {                 // Robot connection
        const url = socket.handshake.auth.url;

        if (url && url !== "") {
            socket.url = socket.handshake.auth.url;
        } else {
            return next(new Error("invalid robot connection, must contains a valid stream url"));
        }
    } else if (type !== "client") {         // Client connection
        return next(new Error("invalid device type, must be 'client' or 'robot'"));
    }
    socket.type = type;
    next();
});

io.on('connection', (socket) => {
    console.log(`a ${socket.type} connected`);

    socket.on("disconnect", () => {
        console.log(`a ${socket.type} disconnected`);
    });

});

server.listen(3000, () => {
    console.log('listening on *:3000');
});