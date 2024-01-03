//same like import - common js module syntax
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");

const profileController = require("../controllers/profileController.js");

// router.route("/").get(getProfile).post(setProfile, setResume);
// router.route("/:id").put(updateProfile).delete(deleteProfile);

router.get("/", authMiddleware.authorize, profileController.getProfile);

router.post("/", authMiddleware.authorize, profileController.setProfile);

//include a variable - use backtick
// router.put("/:id", (req, res) => {
//     res.status(200).json({ message: `Update profile ${req.params.id}` });
// });

// router.delete("/:id", (req, res) => {
//     res.status(200).json({ message: `Delete profile ${req.params.id}` });
// });

module.exports = router;
