const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware.js");

const profileController = require("../controllers/profile.controller.js");

router.get("/", authMiddleware.authorize, profileController.getProfile);
router.get("/image", authMiddleware.authorize, profileController.getProfilePic);
router.get("/resume", authMiddleware.authorize, profileController.getResume);

router.post("/", authMiddleware.authorize, profileController.setProfile);

router.post(
    "/image",
    authMiddleware.authorize,
    multer({ storage: multer.memoryStorage() }).single("upload"),
    profileController.setProfilePic
);
router.post(
    "/resume",
    authMiddleware.authorize,
    multer({ storage: multer.memoryStorage() }).single("upload"),
    profileController.setResume
);

module.exports = router;
