const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  records: [
    {
      type: mongoose.Types.ObjectId,
      ref: "record",
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
