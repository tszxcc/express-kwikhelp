const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");

// const profileController = require("../controllers/profile.controller.js");

// router.get("/", authMiddleware.authorize, profileController.getProfile);
// router.post("/", authMiddleware.authorize, profileController.setProfile);

// router.get("/resume", authMiddleware.authorize, profileController.getResume);
// router.post("/resume", authMiddleware.authorize, profileController.setResume);

module.exports = router;
