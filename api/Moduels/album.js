const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    name: String,
    userId: String,
    photos_Id: [{type: mongoose.Types.ObjectId}] 
});

module.exports = mongoose.model("album", albumSchema);