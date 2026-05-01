import { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });
wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.send("Hello from WebSocket server");

  socket.on("message", (message) => {
    console.log("Recived :", message.toString());

    //echo back
    socket.send(`Server received: ${message}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
console.log(`WebSocket server running on ws://localhost:${PORT}`);
