const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const noteschema = new Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("notes", noteschema);
