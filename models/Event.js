const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 chars long.']
    },
    desc: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [200, 'Description cannot be more than 200 chars long.']
    },
    start: {
        type: String,
        required: [true, 'Please add a Start Date'],
        maxlength: [200, 'Description cannot be more than 200 chars long.']
    },
    end: {
        type: String,
        required: [true, 'Please add a End Date'],
        maxlength: [200, 'Description cannot be more than 200 chars long.']
    },
    location: {
        type: String,
        required: [true, 'Please Add a Location']
    },
    type: {
        type: [String],
        default: []
    },
    isPublic: {
        type: Boolean,
        required: [true, 'Please add a description'],
    },
    attendants: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema)