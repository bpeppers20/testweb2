// Module Variables
const socket = io();

// Variables
const {server, island_name, prices, dodo_code} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
}); // Use Query String Parsing to get data alone from url

console.log(server, island_name, prices, dodo_code);
socket.emit('joinServer', {server, island_name, prices, dodo_code});

// Socket Handlers
// Socket Handlers
socket.on('message', (message) => {
    console.log(`${message}`);
    outputMessage(message);

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