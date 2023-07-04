const path = require('path');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let clientsCount = 0;
let keysHistory = [];
io.on('connection', (socket) => {
    clientsCount++;
    sendClientsUpdate();

    socket.on('disconnect', () => {
        clientsCount--;
        sendClientsUpdate();    
    });

    socket.on('keyDown', (data) => {
        keysHistory.push(data.key);
        while (keysHistory.length > 20) { keysHistory.shift() } // Remove the first element so there's always 10 max
        io.emit('keyDown', { keysHistory });
    });
});

server.listen(8000, () => {
    console.log("Listening at port 8000");
});

function sendClientsUpdate() {
    io.emit('updateClients', { clientsCount });
    console.log('Number of currently connected clients: ' + clientsCount);
    return;
}