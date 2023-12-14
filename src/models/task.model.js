const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    serviceType: {
        type: String,
        // required: true
        required: [true, 'Please add a text value to the service type']
    },
    taskDescription: {
        type: String,
        // required: true
        required: [true, 'Please add a text value to the task description']
    },
    taskArea: {
        type: String,
        // required: true
        required: [true, 'Please add a text value to the task area']
    },
    thingsToBring: {
        type: String,
        // required: true
        required: [true, 'Please add a text value to the things to bring']
    },
    nickname: {
        type: String,

    },
    additionalInfo: {
        type: String,
    },
    taskDate: {
        type: Date,
        required: [true, 'Please add a text value to the task date']
    },
    startTime: {
        type: String,
        required: [true, 'Please add a text value to the start time']
    },
    endTime: {
        type: String,
        required: [true, 'Please add a text value to the end time']
    },
    budget: {
        type: Number,
        required: [true, 'Please add a text value to the budget']
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Task', taskSchema)