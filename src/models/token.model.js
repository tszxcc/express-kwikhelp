const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add a text value to the username"],
        },
        token: {
            type: String,
            required: [true, "Please add a text value to the token"],
        },
        expires: {
            type: Date,
            required: [true, "Please add a text value to the expires"],
        },
    },
    {
        timestamps: true,
    }
);

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
