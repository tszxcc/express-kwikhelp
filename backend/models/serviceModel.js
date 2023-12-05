const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema ({

    myFile: {
        type: String,
        required: [true, 'Please add a file']
    },
    category: {
        type: String,
        // required: true
        required: [true, 'Please add a service category value']
    },
    serviceName: {
        type: String,
        required: [true, 'Please add a service name value']
    },
    serviceDesc: {
        type: String,
        required: [true, 'Please add a service description value']
    },
    
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Service', serviceSchema)