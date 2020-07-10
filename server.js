//Modules
const { request, response } = require("express"); // Gives Access to request and response handlers from experss module npm install express
const express = require('express'); // allows me to use express module for post May combine later


// Object Variables to use modules
const app = express(); //Make a variable the uses express objects
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Set EJS View Engine
app.set('views', './views'); // View Point into our folder views
app.set('view engine', 'ejs');
app.use(express.static('public')); // allows all files in public to be used
app.use(express.urlencoded({extended: true}));

// Variables
// Islands
const islands = { island: {}};
 // HTTP Through Express
 
 
 app.get('/',(request, response) => { // Event Handler for request and response
    response.render('index');
});
// Handle GET Form operations I do not know why post does not work on my cpu
//  'Location', callback
var name =""
app.post('/server1', (request, response) => { // Event Handler for request and response to server1.html

    islands[request.body.island_name] = { islandName: {} }; 
    response.render('server1', {data: request.body}); // render data from input form 
    name = request.body.island_name;
    // Send Message that new room was created
    response.end();
});


io.on('connection', function(client) {
    console.log('Connecting');
    console.log(name +' Island has been found')
 })

 io.on('island found', data =>{
    console.log('Boop Island has been found')
})
// Event Listener
app.listen(process.env.PORT || 3000, () => console.log('App Avaiable on http://localhost:3000')); //While local, gives me the chance to see webpage on local host

// app.listen(process.env.PORT || 3000); is all you need for the port to work