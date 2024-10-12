require("dotenv").config();
const express = require("express");
const cors = require("cors");

const cookieParser = require('cookie-parser')

const app = express();
const authRoutes = require("./routes/AuthRouts");
const MessageRoutes = require('./routes/MessagesRoutes')
app.use(cors());
app.use(express.json());

// middleware:
app.use(express.json()); // parses an incomming JSON object into JavaScript

// DB connection
const connectDB = require("./config/db");
app.listen(process.env.PORT, () =>
  console.log(`server is running on ${process.env.PORT}`)
);

connectDB();

// //access cookies
// app.use(cookieParser)

// Routes:
app.use(authRoutes);
app.use(MessageRoutes)
