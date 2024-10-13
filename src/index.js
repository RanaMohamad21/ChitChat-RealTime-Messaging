require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/AuthRouts");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());

// middleware:
app.use(express.json()); // parses an incomming JSON object into JavaScript
app.use(cookieParser());

// DB connection
const connectDB = require("./config/db");
app.listen(process.env.PORT, () =>
  console.log(`server is running on ${process.env.PORT}`)
);

connectDB();

// Routes:
app.use(authRoutes);

