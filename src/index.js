require("dotenv").config();

const { app, server } = require("./socket/socket");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/AuthRouts");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());

// middleware:
app.use(express.json()); // parses an incomming JSON object into JavaScript
app.use(cookieParser());

// DB connection
const connectDB = require("./config/db");
server.listen(process.env.PORT, () =>
  console.log(`server is running on ${process.env.PORT}`)
);

connectDB();

// Routes:
app.use(authRoutes);
