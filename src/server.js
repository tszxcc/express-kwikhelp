const dotenv = require("dotenv");
dotenv.config({ path: "./src/env/.env", debug: true });

const express = require("express");

const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/db.js");
const routes = require("./routes/index.route.js");
const port = process.env.PORT || 5000;

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

// for parsing cookies to the req
app.use(cookieParser());
// have to use this to get req.body or else it will be undefined or body data will be empty
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// multer for form-data
app.use(multer().array());

app.use("/api", routes);

const startServer = async () => {
    await connectDB();
    app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
