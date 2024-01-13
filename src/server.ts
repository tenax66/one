import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = Number(process.env.PORT) || 3000;

let MESSAGE = "One thing";

// Routing
const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/index.css", (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + "/index.css");
});

app.use("/", router);

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
    MESSAGE = escapeHtml(m);

    // broadcast the received message
    io.emit("receiveMessage", MESSAGE);
  });
});

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
