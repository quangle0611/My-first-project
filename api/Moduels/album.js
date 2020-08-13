const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    name: String,
    photoId: [{type: mongoose.Types.ObjectId}] 
});

module.exports = mongoose.model("album", albumSchema);