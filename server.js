import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";   
import { setupSocket } from "./api/socket/socket.js";
import dotenv from "dotenv"; 
import User from "./api/model/user.js";         

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to MongoDB Atlas (single call)
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://campus-market-place-frontend.vercel.app"
    ],
    credentials: true,
  },
});

// Setup socket handlers
setupSocket(io);

// Test insert
(async () => {
  try {
    const testUser = new User({ name: "Aaditi", email: "aaditi@example.com" });
    await testUser.save();
    console.log("✅ Test user saved to Atlas");
  } catch (err) {
    console.error("❌ Error saving test user:", err.message);
  }
})();

// Start server
server.listen(port, () => {
  console.log(`localhost running at port ${port}`);
});
