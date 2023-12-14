const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema ({
    amount: {
        type: Number,
        // required: true
        required: [true, 'Please add a payment value']
    },
    paymentDescription: {
        type: String,
        required: [true, 'Please add a payment description value']
    },
    paymentDate: {
        type: String,
        required: [true, 'Please add a payment date value']
    },
    
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Payment', paymentSchema)