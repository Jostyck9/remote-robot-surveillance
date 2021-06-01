function updateMasterRobot(io, robotSocket) {
    if (robotSocket.masterList.length !== 0) {
        const clientSocket = io.of('/').sockets.get(robotSocket.masterList[0]);

        if (!clientSocket) {
            console.log(`Client ${robotSocket.masterList[0]} not found...`);
            robotSocket.masterList.shift();
            return;
        }
        if (clientSocket.isControlling === false) {
            clientSocket.isControlling = true;
            clientSocket.emit("master", robotSocket.id);
            console.log(`Client ${clientSocket.id} is the master of robot ${robotSocket.id}`)
        }
    }
};

function connectToRobot(io, clientSocket, robotId) {
    const robotSocket = io.of('/').sockets.get(robotId);

    if (clientSocket.controledRobot !== "" && clientSocket.controledRobot !== robotId) {
        disconnectFromRobot(io, clientSocket);
    }

    if (robotSocket) {
        if (!robotSocket.masterList.includes(clientSocket.id)) {
            robotSocket.masterList.push(clientSocket.id);
            clientSocket.controledRobot = robotSocket.id;
            console.log(`Connect to robot: Client ${clientSocket.id} is added to control robot ${robotId}`)
            if (robotSocket.masterList.length !== 1) {
                clientSocket.emit("master wait", `you are in ${robotSocket.masterList.length} position in the waiting list for master, you will be notified when control is available for you`);
            }
        } else {
            console.log(`Connect to robot : Client ${clientSocket.id} is already waiting to control robot ${robotId} queue : ${robotSocket.masterList.length}`)
        }
        updateMasterRobot(io, robotSocket);
    } else {
        clientSocket.emit("master error", `robot ${robotId} not found`);
        console.log(`Connect to robot : robot ${robotId} not found ...`);
    }
};

function disconnectFromRobot(io, clientSocket) {
    const robotSocket = io.of('/').sockets.get(clientSocket.controledRobot);

    if (robotSocket) {
        robotSocket.masterList = robotSocket.masterList.filter((value) => {
            return value !== clientSocket.id;
        })
        updateMasterRobot(io, robotSocket);
        console.log(`Disconnect from robot : client ${clientSocket.id} disconnected from robot ${clientSocket.controledRobot}`)
    } else {
        console.log(`Disconnect from robot : robot ${clientSocket.controledRobot} not found ...`)
    }
    clientSocket.controledRobot = "";
    clientSocket.isControlling = false;
};

function disconnectFromClients(io, robotSocket) {
    robotSocket.masterList.forEach(clientId => {
        const clientSocket = io.of('/').sockets.get(clientId);

        if (clientSocket) {
            clientSocket.controledRobot = "";
            clientSocket.isControlling = false;
        }
    });
}

module.exports = { connectToRobot, disconnectFromRobot, disconnectFromClients };