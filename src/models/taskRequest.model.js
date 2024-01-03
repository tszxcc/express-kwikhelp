const mongoose = require("mongoose");

const taskRequestSchema = mongoose.Schema(
    {
        taskID: {
            type: String,
            required: [true, "Please add a text value to the task ID"],
        },
        username: {
            type: String,
            required: [true, "Please add a text value to the username"],
        },
        helper: {
            type: String,
        },
        requestStatus: {
            type: String,
            default: "Pending", // Pending, Accepted, Rejected
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("taskRequest", taskRequestSchema);
