require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/AuthRouts");
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.json());

// middleware:
app.use(express.json()); // parses an incomming JSON object into JavaScript

// DB connection
const dbURI =
  "mongodb+srv://user1:mxRT34RF4543dmRF@cluster0.6y8ma.mongodb.net/";

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("DB connected Successfully!");
    // Positioned here to make sure the app doesn't start listenning before the db is connected
    app.listen(process.env.PORT, () =>
      console.log(`server is running on ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));

// Routes:
app.use(authRoutes);
