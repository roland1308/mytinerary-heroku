const mongoose = require('mongoose')
const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        // unique: true
    },
    username: {
        type: String,
        // required: true,
        // unique: true
    },
    address: {
        type: String,
        // required: true
    },
    city: {
        type: String,
        // required: true
    },
    photo: {
        type: String,
        // required: true,
        // unique: true
    },
    time: {
        type: String,
        // required: true
    },
    cost: {
        type: String,
        // required: true
    },
    comments: {
        type: String,
        // required: true
    }
})

//name of module is the singular version (activity) of the database name (activities)
module.exports = mongoose.model('activity', activitySchema)