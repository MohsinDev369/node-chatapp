// a temp db : user array and util functions that interact with the db

const users = []

//join use to chat
function joinUser(id,userName,room) {
    const user = { id, userName, room }
    
    users.push(user);
    return user
}

//get Curent user
function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}
  
  //get rooms users
  function getRoomUsers(room) {
    return users.filter(user => user.room === room);
   }

module.exports = {
  joinUser,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};