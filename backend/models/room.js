const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    walmart: [String],
    indian: [String],
    note: String,
    
});

module.exports = mongoose.model('Room', roomSchema);
