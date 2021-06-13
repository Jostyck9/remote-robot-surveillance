import io from 'socket.io-client';
import Store from '../Store/Store';
import { addRobot, initRobots, removeRobot } from '../Actions/robotsActions';
import { setMaster, setSpectator } from '../Actions/userActions';

const socket = io('http://192.168.0.42:3000', { autoConnect: false });
socket.auth = {
    device: "client",
};

socket.on("connect", (_) => {
    console.log('Connected');
});

socket.on("connect_error", (err) => {
    console.log('Connection error: ' + err);
});

socket.on("robots", (robots) => {
    Store.dispatch(initRobots(robots));
});

socket.on("robot connected", ({ robotId, url }) => {
    Store.dispatch(addRobot({robotId, url}));
});

socket.on("robot disconnected", (robotId) => {
    Store.dispatch(removeRobot(robotId));
});

socket.on("master wait", ({ robotId, url }) => {
    Store.dispatch(setSpectator(url));
});

socket.on("master", ({ robotId, url }) => {
    Store.dispatch(setMaster(url));
});

socket.on("master error", (msg) => {
    console.log(`Master error : ${msg}`);
});

socket.connect();

export default socket;