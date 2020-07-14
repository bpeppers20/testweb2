//Modules
const formatMessage = require('./public/js/messages'); // User made module
const {userJoin, getCurrentIsland} = require('./public/js/users'); // User Made module
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
 


io.on('connection', socket => {
    console.log("Connected to Server Socket");
    socket.on('joinServer', ({server, island_name, prices, dodo_code}) => {
        const island = userJoin(socket.id, server, island_name, prices, dodo_code);
        // Join Island
        socket.join(island.server);
        
        socket.emit('message', formatMessage(botName, 'Welcome to the Server!')); // Only client
        // Broadcast when a user connects
        socket.broadcast.to(island.server).emit('message', formatMessage(botName,`${island.island_name} has been found!`)); // to notify all but client
        socket.emit
   
    });
    
    // Listen for message
    socket.on('sendData', (msg) => {
        console.log(msg);
        const island = getCurrentIsland(socket.id);
        io.to(island.server).emit('message', formatMessage(island.island_name, msg)); //add extra data for island info
    });

     // When Client disconnects
     socket.on('disconnect', ()=> {
        io.emit('message', formatMessage(botName,'An Island has left!')); // notify everyone w/ client
    });
});

// Event Listener
server.listen(process.env.PORT || 3000, () => console.log('App Avaiable on http://localhost:3000')); //While local, gives me the chance to see webpage on local host

// app.listen(process.env.PORT || 3000); is all you need for the port to work