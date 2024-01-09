const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller.js");

router.get("/", serviceController.getService);

// router.post("/", serviceController.addService);
// router.route("/").get(getService).post(setService);

// router.get("/", (req, res) => {
//     res.status(200).json({ message: "Get services successful" });
// });

// router.post("/", (req, res) => {
//     res.status(200).json({ message: "Set services successful" });
// });

module.exports = router;
