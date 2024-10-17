const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    },
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpires: {
        type: Date,
    },
});

// Method to generate email verification token
userSchema.methods.generateVerificationToken = function () {
    const token = crypto.randomBytes(20).toString('hex');
    this.verificationToken = token;
    this.verificationTokenExpires = Date.now() + 3600000; // Token valid for 1 hour
    return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;