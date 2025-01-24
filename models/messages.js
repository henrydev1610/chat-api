const mongoose = require('mongoose');
const {Schema} = mongoose



const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image:{
        type: String,
        
    }
}, {timestamps: true})

module.exports = mongoose.model('Messages', messageSchema);