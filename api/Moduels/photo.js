const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: String,
    userId: String ,
    image: Object,
    date: Date,
    path: String
});

module.exports = mongoose.model("photo", photoSchema);