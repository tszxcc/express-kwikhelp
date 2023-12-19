const mongoose = require("mongoose");

const credential = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add a text value to the username"],
        },
        role: {
            type: String,
            required: [true, "Please add a text value to the role"],
        },
        passwordHash: {
            type: String,
            required: [true, "Please add a text value to the password"],
        },
        pepper: {
            type: String,
            required: [true, "Please add a text value to the pepper"],
        },
    },
    {
        timestamps: true,
    }
);

const Credential = mongoose.model("credential", credential);
module.exports = Credential;
