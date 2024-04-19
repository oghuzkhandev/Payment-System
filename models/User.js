const mongoose = require('mongoose');
const Bill = require('./Bill');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;