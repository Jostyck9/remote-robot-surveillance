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

const { connectToRobot, disconnectFromRobot, disconnectFromClients } = require('./robotControl');

app.get('/', (req, res) => {
    res.send({ "msg": "this server is only usable with socket" })
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

const initSocketRobotProperties = (socket) => {
    socket.type = "robot";
    socket.url = "";
    socket.masterList = [];
}

const initSocketClientProperties = (socket) => {
    socket.type = "client";
    socket.controledRobot = "";
    socket.isControlling = false;
}

/* MiddleWare to save if device or robot connection */
io.use((socket, next) => {
    const type = socket.handshake.auth.device;

    console.log("Attempt connection");
    if (type === "robot") {                 // Robot connection
        const url = socket.handshake.auth.url;

        initSocketRobotProperties(socket);
        if (url && url !== "") {
            socket.url = socket.handshake.auth.url;
        } else {
            return next(new Error("invalid robot connection, must contains a valid stream url"));
        }
    } else if (type === "client") {         // Client connection
        initSocketClientProperties(socket);
    } else {
        return next(new Error("invalid device type, must be 'client' or 'robot'"));
    }
    next();
});

io.on('connection', (socket) => {
    console.log(`a ${socket.type} connected`);

    /* When a client has connected, send him the available robots */
    if (socket.type === "client") {
        const robots = [];

        for (let [id, socket] of io.of('/').sockets) {
            if (socket.type === "robot") {
                robots.push({
                    robotId: id,
                    url: socket.url
                });
            }
        }
        socket.emit("robots", robots);
    }

    /* Notify users that a robot has connected */
    if (socket.type === "robot") {
        socket.broadcast.emit("robot connected", {
            robotId: socket.id,
            url: socket.url,
        });
    }

    socket.on("disconnect", () => {
        console.log(`a ${socket.type} disconnected`);

        /* Notify that a robot disconnected */
        if (socket.type === "robot") {
            socket.broadcast.emit("robot disconnected", socket.id);
            disconnectFromClients(io, socket);
        } else {
            disconnectFromRobot(io, socket);
        }
    });


    /* client connect to robot for control */
    socket.on("connect to robot", (id) => {
        if (socket.type === "client") {
            connectToRobot(io, socket, id);
        }
    });

    // disconnect of current robot
    socket.on("disconnect from robot", () => {
        if (socket.type === "client") {
            disconnectFromRobot(io, socket);
        }
    });

});

const PORT = process.env.PORT || 3000;

server.listen(3000, () => {
    console.log('listening on *:3000');
});