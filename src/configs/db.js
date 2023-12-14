const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        throw new Error("MongoURI is not defined");
    }

    await mongoose
        .connect(mongoURI)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
};

module.exports = connectDB;
