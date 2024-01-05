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
        email: {
            type: String,
            required: [true, "Please add a text value to the email"],
        },
        phone: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
        fullName: {
            type: String,
            default: "",
        },
        profilePic: {
            type: String,
            default: "",
        },
        resume: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Credential = mongoose.model("credential", credential);
module.exports = Credential;
