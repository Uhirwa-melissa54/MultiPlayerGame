// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store player data in memory (temporary)
let players = [];

// When a user connects
io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  // Send current players to the new connection
  socket.emit("playerList", players);

  // Listen for new player data
  socket.on("addPlayer", (playerData) => {
    players.push(playerData);
    io.emit("playerList", players); // broadcast updated list to all
  });

  // Remove player when they disconnect
  socket.on("disconnect", () => {
    console.log("A player disconnected:", socket.id);
    players = players.filter((p) => p.socketId !== socket.id);
    io.emit("playerList", players);
  });
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
