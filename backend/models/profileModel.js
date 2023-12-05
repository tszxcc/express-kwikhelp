const mongoose = require('mongoose')

const profileSchema = mongoose.Schema ({
    fullname: {
        type: String,
        // required: true
        required: [true, 'Please add a text value for fullname']
    },
    description: {
        type: String,
        required: [true, 'Please add a text value for description']
    },
    phonenumber: {
        type: String,
        required: [true, 'Please add a text value for phone number']
    },
    email: {
        type: String,
        required: [true, 'Please add a text value for email']
    },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Profile', profileSchema)