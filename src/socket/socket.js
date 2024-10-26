const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://real-time-messaging-mern-stac-rana-mohamad-abdelsalams-projects.vercel.app","https://real-time-messagin-git-73304b-rana-mohamad-abdelsalams-projects.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true, // Allows cookies to be sent/received
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Get the online users status
const userSocketMap = {}; // {userID: socketID}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // Take the user ID from the query object in the frontend
  const userId = socket.handshake.query.userId;
 
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // send event to all connected (online) clients:
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Used to listen to events, on either the client or the server
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];

    // Send the connected users after deletign the disconnected user.
    // getOnlineUsers will be the event name used in the front end to get the users.
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server, getReceiverSocketId };
