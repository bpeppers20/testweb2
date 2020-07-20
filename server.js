//Modules
const {formatMessage, formatInfoMessage} = require('./public/js/messages'); // User made module
const {userJoin, getCurrentIsland, userLeave, getServerUsers} = require('./public/js/users'); // User Made module
const express = require('express'); // allows me to use express module for post May combine later
// Object Variables to use modules
const app = express(); //Make a variable the uses express objects
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(express.static('public')); // allows all files in public to be used
app.use(express.urlencoded({extended: true}));

// Variables
botName = 'Island Bot';

// app.get/post changes the url reference to the file to whatever you named it 
//Outside of index, the name must match without extention
 
const serverHistory = [];

io.on('connection', socket => {
    console.log("Connected to Server Socket");
    socket.on('joinServer', ({server, island_name, prices, dodo_code}) => {
        const island = userJoin(socket.id, server, island_name, prices, dodo_code);
        // Join Island
        socket.join(island.server);
        // Retrieve old data
        if (island) {
            serverHistory.forEach (i => {
                socket.emit('sendMessage', formatInfoMessage(i.island_name, i.prices, i.dodo_code));
            })
        }
    });
    
    // Listen for message
    socket.on('joinServer', (msg) => {
        const island = getCurrentIsland(socket.id);
        serverHistory.push(island);
        io.to(island.server).emit('sendMessage', formatInfoMessage(island.island_name, island.prices, island.dodo_code));
        io.to(island.server).emit('roomUsers', {
            room: island.server,
            users: getServerUsers(island.server)
        }); // send Island data
    });

     // When Client disconnects
     socket.on('disconnect', ()=> {
        const island = userLeave(socket.id);
        if (island) { // if island exist
            io.to(island.server).emit('message', formatMessage(botName,`${island.island_name} has left!`)); // notify everyone w/ client
            io.to(island.server).emit('roomUsers', {
                room: island.server,
                users: getServerUsers(island.server)
            }); // Send Island Data 
            //delete disconnected user data
            serverHistory.forEach( i => {
                serverHistory.splice(i.id, 1);
            })
        }
    });
});

// Event Listener
server.listen(process.env.PORT || 3000, () => console.log('App Avaiable on http://localhost:3000')); //While local, gives me the chance to see webpage on local host

// app.listen(process.env.PORT || 3000); is all you need for the port to work