// Module Variables
const socket = io();

// Variables
const {server, island_name, prices, dodo_code} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
}); // Use Query String Parsing to get data alone from url
const serverName = document.getElementById('server-name');
// Client Counter
const client = 0;

// Socket Emiters and Handlers
socket.emit('joinServer', {server, island_name, prices, dodo_code});

// Get Room Data
socket.on('roomUsers', ({room, users}) => {
    outputServerName(room);
});

socket.on('message', (message) => {
    outputMessage(message);
});

socket.on('sendMessage', msg => {
    outputIslandInfo(msg);
});


//Functions

function outputIslandInfo (msg) { // Output message to DOM
    // assign row based on client counter
    const div = document.createElement('div');
    div.innerHTML = `
    <p class="text"> 
    ${msg.islandName} <br>
    Prices: ${msg.prices} Bells
      <br>
      Dodo Code: ${msg.dodoCode}
    </p>`;
    document.querySelector(`.infoServer`).appendChild(div); // Append div to chat-messags
}


function outputMessage (msg) { // Output message to DOM
    const div = document.createElement('div');
    div.innerHTML = `<p class="text">${msg.username} <span> ${msg.time}</span>
      ${msg.text}
    </p>`;
    document.querySelector(`.infoServer`).appendChild(div); // Append div to chat-messags
}

// Add Room name to DOM
function outputServerName (server) {
    serverName.innerText = server;
}