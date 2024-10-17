require("dotenv").config();

const { app, server } = require("./socket/socket");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const authRoutes = require("./routes/AuthRouts");

const MessageRoutes = require('./routes/MessagesRoutes')
const userRoutes = require('./routes/userRoutes')


app.use(cors());

// middleware:
app.use(express.json()); // parses an incomming JSON object into JavaScript

app.use(cookieParser());

// DB connection
const connectDB = require("./config/db");
server.listen(process.env.PORT, () =>
  console.log(`server is running on ${process.env.PORT}`)
);

connectDB();

<<<<<<< HEAD
// Routes:
app.use(authRoutes);
=======

// Routes:
app.use(authRoutes)
app.use(MessageRoutes)
app.use(userRoutes)

>>>>>>> 8ffee28071e33cdf51d42a0943208afa2155c612
