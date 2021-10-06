const mongoose = require('mongoose')

const RequestSchema = mongoose.Schema({

    type: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    }
    
})

module.exports = mongoose.models.Request || mongoose.model('Request', RequestSchema)