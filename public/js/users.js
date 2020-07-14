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

// Island Leaves Chat
function userLeave(id) {
    const index = users.findIndex(island => island.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0]; // Return Array without element with selected index
    } //The splice() method adds/removes items to/from an array, and returns the removed item(s).
    // splice(index, #removed, items to be added)
}

// Get Room Users
function getServerUsers(server) {
    return users.filter(island => island.server === server);
}
// Export for use
module.exports = {
    userJoin,
    getCurrentIsland,
    userLeave,
    getServerUsers
};