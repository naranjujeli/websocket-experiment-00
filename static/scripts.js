const socket = io.connect('/');

socket.on('updateClients', (data) => {
    console.log('Count of currently connected clients: ' + data.clientsCount);
})

document.onkeydown = (e) => {
    const key = e.key;
    socket.emit('keyDown', { key });
};

const keysHistoryList = document.querySelector('.keys-history-list');
socket.on('keyDown', (data) => {
    console.log(data.keysHistory);
    let finalList = '';
    data.keysHistory.forEach((key) => {
        finalList += `<li>${key}</li>`;
    });
    keysHistoryList.innerHTML = finalList;
});