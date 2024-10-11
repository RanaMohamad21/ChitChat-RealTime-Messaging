const mongoose = require("mongoose");

// A user has an id, username, email, password, img url, status, contact list, group chats, createdAt, lastSeen
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  status: String,
  contactList: [
    {
      type: mongoose.SchemaTypes.ObjectID,
      ref: "User",
    },
  ],
  groupChats: [
    {
      type: mongoose.SchemaTypes.ObjectID,
      //? will be uncommented when the chat schema is built
      // ref: 'Chat',
    },
  ],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  lastSeen: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
