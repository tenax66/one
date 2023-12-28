const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

let MESSAGE = "One Thing";

// routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// run
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`new user connected: ${socket.id}`);

  // send message for the first time
  socket.emit("welcomeMessage", MESSAGE);

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });

  socket.on("sendMessage", (m) => {
    console.log("received message: ", m);

    // TODO: tuning performance
    MESSAGE = m;

    // broadcast the received message
    io.emit("receiveMessage", m);
  });
});
