const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  private: {
    type: Boolean,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const Record = mongoose.model("record", recordSchema);

module.exports = Record;
