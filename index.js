const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const msgFormater = require("./utils/msgFormatter.js");
const app = express();
const POART = 5000;
const server = http.createServer(app);
const io = socketio(server);
const {
  joinUser,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/db.js");
// setting up frontend middware
app.use(express.static(path.join(__dirname, "view")));

// socket.emit : sending msg to single client
// socket.broadcast.emit : sending msg to all the client expect the client that triggered the event
// io.emit : sending msg to  all the client in gernal

// run when clients connects
io.on("connect", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = joinUser(socket.id, username, room);
    socket.join(user.room);

    //sending msg to single client
    //welcome message
    socket.emit("msg", msgFormater("Bot", "welcome to mohsins chatapp"));

    //this will send msg to everyone expect the user itself
    //BroadCasts when clients connects
    socket.broadcast
      .to(user.room)
      .emit("msg", msgFormater("Bot", `${user.userName} joined`));

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          "msg",
          msgFormater("Bot", `${user.userName} Left`)
        );
      }
    });
  }); // <-End of joinRoom event function

  //listening for  chatMsg event that will be  send from client
  socket.on("chatMsg", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("msg", msgFormater(user.userName, msg));
  });
});

server.listen(POART, () => {
  console.log(`http://localhost:${POART}`);
});
