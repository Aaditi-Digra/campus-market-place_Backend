import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { db } from "./cofig/db.js";
import { setupSocket } from "./api/socket/socket.js";

const port = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  },
});

// Setup socket handlers
setupSocket(io);

// db
db();

// Start server
server.listen(port, () => {
  console.log(`localhost running at port ${port}`);
});
