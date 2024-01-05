import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT: number = Number(process.env.PORT) || 3000;

let MESSAGE: string = "One thing";

// routing
app.get("/", (req: express.Request, res: express.Response) => {
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

  socket.on("sendMessage", (m: string) => {
    console.log("received message: ", m);

    // TODO: tuning performance
    MESSAGE = m;

    // broadcast the received message
    io.emit("receiveMessage", m);
  });
});
