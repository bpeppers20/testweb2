const moment = require('moment');
function formatMessage (username, text) {
    return { // Add Extra variables for island info
        username, 
        text,
        time : moment().format('h:mm a') // hours, minutes, am and pm
    };
}

function formatInfoMessage (islandName, prices, dodoCode) {
    return { // Add Extra variables for island info
        islandName, 
        prices,
        dodoCode,
        time : moment().format('h:mm a') // hours, minutes, am and pm
    };
}

module.exports = {
    formatMessage,
    formatInfoMessage // Send code as a module
};