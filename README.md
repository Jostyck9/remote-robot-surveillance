# remote-robot-surveillance

Control via an application a surveillance robot with object recognition

# start

To start the server on local computer type :

```bash
npm start
```

You can set your own port by using the environment variable "port"..

# Commands

The server is for use with sockets. We use an socket.io lib.

You can find an example with the index.html file provided in the src folder

## Connection

On connection, you must identify yourself.
Your should add properties to the socket.auth map.

### Robot connection :

```js
socket.auth = {
    device: "robot",
    url: "http://localhost:8888",
};
socket.connect();
```

the url is the stream url of the robot to be passed to users

### Client connection :

```js
socket.auth = {
    device: "client",
};
socket.connect();
```

## Connect to robot

Connect to a robot to control it.

If somebody is already connected, you will be put on a waiting list and then be notified when you're the master of the robot and can control it.

```js
socket.emit("connect to robot", robotId);
```

## Disconnect from robot

Disonnect from a controlled robot.

Will remove you from controlling the robot you asked to control.

```js
socket.emit("disconnect from robot");
```

## Move

Send movement information to a robot.
If you're not master, you will receive an error on event "move error"

```js
socker.emit("move", mouvementData);
```

mouvement data can be a map

# Clients and Robots commun events

## Connect

On connection success, an event is sent to the socket to confirm it.

```js
socket.on("connect", (_) => {});
```

## Connect error

If an error occurs on connection, an event is sent with an error message.

```js
socket.on("connect_error", (err) => {});
```

# Client events

## Robots

After connection, the server send you the list of current robots connected.
The list contains id and stream url of each robot.

```js
socket.on("robots", (robots) => {
    robots.forEach(({ robotId, url }) => {
        console.log(`Robot ${robotId} connected with : ${url}`);
    });
});
```

## Robot connected

If a robot connect to the server after you.
The server will send to all the client the new robot information.
The id and the stream url.

```js
socket.on("robot connected", ({ robotId, url }) => {
    console.log(`Robot ${robotId} connected with : ${url}`);
});
```

## Robot disconnected

If a robot disconnect from the server.
The server will send to all the client an event to inform them with the robot id.

```js
socket.on("robot disconnected", (robotId) => {
    console.log(`Robot ${robotId} disconnected`);
});
```

## Master wait

After requesting to control a robot with the 'connect ro robot' command.
You are put in a waiting list to control it.

The server will notify you with the event master wait when the robot is already controlled by another client.

```js
socket.on("master wait", (msg) => {
    console.log(`Waiting for master : ${msg}`);
});
```

## Master

After requesting to control a robot with the 'connect ro robot' command.
You are put in a waiting list to control it.

The server will notify you with the event master when you can control the robot with the 'move' command.

```js
socket.on("master", (robotId) => {
    console.log(`You are the master of robot ${robotId}`);
});
```

## Master error

After requesting to control a robot with the 'connect ro robot' command.
if an error occurs, you will receive an event with a message

```js
socket.on("master error", (msg) => {
    console.log(`Master error : ${msg}`);
});
```

## Move error

If an error occurs of if you don't have the right to control a robot because you're still not the master.

An error will be sent on the event "master error";

```js
socket.on("master error", (msg) => {
    console.log(`Master error : ${msg}`);
});
```

# Robot events

## Move

A robot will receive movement command.

```js
socket.on("move", (mvt) => {
    console.log(`received move from client : ${mvt}`);
});
```
