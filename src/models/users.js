const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// A user has an id, username, email, password, img url, status, contact list, group chats, createdAt, lastSeen
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter a username."],
  },
  email: {
    type: String,
    required: [true, "Please enter an Email."], // Custom error message
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minlength: [8, "Minimum password length is 8 characters."],
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
      // ref: 'Conversation',
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

// Password Hashing:
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to login user:
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("User", userSchema);
