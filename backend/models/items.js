const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
   
    _id: { type: String, default: 'singleton' },
    indian: [String],
    walmart: [String]
   
    
});

module.exports = mongoose.model('Item', itemSchema);
