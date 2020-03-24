const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itinerarySchema = new mongoose.Schema({
  name: {
    type: String
    // required: true,
    // unique: true
  },
  city: {
    type: String
    // required: true
  },
  city_id: {
    type: String
    // required: true,
    // unique: true
  },
  country: {
    type: String
    // required: true
  },
  username: {
    type: String
    // required: true
  },
  photo: {
    type: String
    // required: true
  },
  rating: {
    type: String
    // required: true
  },
  duration: {
    type: Number
    // required: true
  },
  price: {
    type: String
    // // required: true
  },
  // comments: {
  //   type: Array
  // },
  hashtags: {
    type: String
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  activities: [{ type: Schema.Types.ObjectId, ref: "activity" }]
});

//name of module is the singular version (itinerary) of the database name (itineraries)
module.exports = mongoose.model("itinerary", itinerarySchema);
