const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
  username: {
    type: String
  },
  picture: {
    type: String
  },
  usercomment: {
    type: String
  },
  itineraryid: {
    type: Schema.Types.ObjectId
  }
});

//name of module is the singular version (comment) of the database name (comments)
module.exports = mongoose.model("comment", commentSchema);
