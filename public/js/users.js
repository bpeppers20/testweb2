// Manage all user operations
const users = []; //Till Database implimented (maybe) we are using an array
// Join user to server
function userJoin(id, server, island_name, prices, dodo_code) {
    const island = {id, server, island_name, prices, dodo_code };
    users.push(island);
    return island;
}

// Get Current Island
function getCurrentIsland(id) {
    return users.find(island => island.id === id); // Find user by id  
}

// Export for use
module.exports = {
    userJoin,
    getCurrentIsland
};