const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  picture: {
    type: String
  },
  pw: {
    type: String
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "itinerary" }]
});

module.exports = mongoose.model("user", userSchema);
