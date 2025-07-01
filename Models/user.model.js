const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 15,
        match: /^[a-zA-Z0-9]+$/,  
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,  
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        match: /^[a-zA-Z]+$/, 
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        match: /^[a-zA-Z]+$/, 
    },
    role: {
        type: String, 
        default:"CLIENT_ROLE", 
        enum:["ADMIN_ROLE", "CLIENT_ROLE", "USER_ROLE"]
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('User', userSchema);
