// Module Variables
const socket = io();

// Variables
const {server, island_name, prices, dodo_code} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
}); // Use Query String Parsing to get data alone from url
const serverName = document.getElementById('server-name');

console.log(server, island_name, prices, dodo_code);
socket.emit('joinServer', {server, island_name, prices, dodo_code});

// Get Room Data
socket.on('roomUsers', ({room, users}) => {
    outputServerName(room);
});

// Socket Handlers
socket.on('message', (message) => {
    console.log(`${message}`);
    outputMessage(message);

});

socket.on('sendMessage', msg => {
    console.log(`${msg}`);
    outputIslandInfo(msg);
});


//Functions
function outputMessage (msg) { // Output message to DOM
    const div = document.createElement('div');
    div.classList.add('message'); // Adds a class to a div or element from your html
    // Add extra data for bells and dodocode
    div.innerHTML = `<p class="meta">${msg.username} <span> ${msg.time}</span></p>
    <p class="text"> 
      ${msg.text}
    </p>`;
    document.querySelector('.info').appendChild(div); // Append div to chat-messags
}

function outputIslandInfo (msg) { // Output message to DOM
    const div = document.createElement('div');
    div.classList.add('message'); // Adds a class to a div or element from your html
    // Add extra data for bells and dodocode
    div.innerHTML = `<p class="meta">${msg.islandName} <span> ${msg.time}</span></p>
    <p class="text"> 
      Prices: ${msg.prices} Bells
      <br>
      Dodo Code: ${msg.dodoCode}
    </p>`;
    document.querySelector('.info').appendChild(div); // Append div to chat-messags
}

// Add Room name to DOM
function outputServerName (server) {
    serverName.innerText = server;
}