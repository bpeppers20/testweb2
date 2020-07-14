const moment = require('moment');
function formatMessage (username, text) {
    return { // Add Extra variables for island info
        username, 
        text,
        time : moment().format('h:mm a') // hours, minutes, am and pm
    };
}

module.exports = formatMessage; // Send code as a module