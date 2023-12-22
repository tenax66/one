import * as WebSocket from "ws";

const PORT = 3000;
const server = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server is listening on port ${PORT}`);

// connection event
server.on("connection", (socket: WebSocket) => {
  console.log("Client connected");

  socket.on("message", (data, isBinary) => {
    console.log(`Received message: ${data}`);
    for (const client of server.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
