const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true,
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 chars long.']
    },
    fullName: {
        type: String,
        required: [true, 'Please add a fullName'],
        maxlength: [100, 'fullName cannot be more than 100 chars long.']
    },
    password : {
        type: String,
        required: [true, 'Please add a password']
    },
    gender : {
        type: String,
        required: [true, 'Please select a gender']
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)