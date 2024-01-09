const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
    {
        category: {
            type: String,
            // required: true
            required: [true, "Please add a service category value"],
        },
        serviceName: {
            type: String,
            required: [true, "Please add a service name value"],
        },
        serviceDesc: {
            type: String,
            required: [true, "Please add a service description value"],
        },
        serviceUrl: {
            type: String,
            required: [true, "Please add a service url value"],
        },
        serviceImg: {
            type: String,
            required: [true, "Please add a service image value"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Service", serviceSchema);
