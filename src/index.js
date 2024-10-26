require("dotenv").config();

const { app, server } = require("./socket/socket");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/AuthRouts");
const path = require("path");
const fileUpload = require("express-fileupload");
const MessageRoutes = require("./routes/MessagesRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(
  cors({
    origin: ["https://real-time-messaging-mern-stac-rana-mohamad-abdelsalams-projects.vercel.app","https://real-time-messagin-git-73304b-rana-mohamad-abdelsalams-projects.vercel.app"], // frontend URL
    credentials: true, // Allows cookies to be sent/received
  })
);

// middleware:
app.use(express.json()); // parses an incomming JSON object into JavaScript
app.use(fileUpload());

app.use(cookieParser());

// DB connection
const connectDB = require("./config/db");
server.listen(process.env.PORT, () =>
  console.log(`server is running on ${process.env.PORT}`)
);

connectDB();

// Routes:
app.use(authRoutes);
app.use(MessageRoutes);
app.use(userRoutes);
