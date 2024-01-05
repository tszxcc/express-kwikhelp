const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");

// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");

const profileController = require("../controllers/profile.controller.js");

// const profilePicStorage = new GridFsStorage({
//     url: process.env.MONGO_URI,
//     file: (req, file) => {
//         return {
//             filename: file.originalname,
//             bucketName: "profilePic", // Optional bucket name
//         };
//     },
// });

// const uploadProfilePic = multer({ storage: profilePicStorage });

router.get("/", authMiddleware.authorize, profileController.getProfile);
router.post("/", authMiddleware.authorize, profileController.setProfile);

// router.get(
//     "/picture",
//     authMiddleware.authorize,
//     profileController.getProfilePic
// );
// router.post(
//     "/picture",
//     authMiddleware.authorize,
//     // uploadProfilePic.single("profilePic"),
//     profileController.setProfilePic
// );

// router.get("/resume", authMiddleware.authorize, profileController.getResume);
// router.post("/resume", authMiddleware.authorize, profileController.setResume);

module.exports = router;
