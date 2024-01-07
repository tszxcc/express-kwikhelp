const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.post("/recover", authController.recover); // request recover email
router.post("/reset", authController.reset); // reset password with token

// check access token
router.get("/access", authController.access);
// checl refresh token
router.get("/refresh", authController.refresh);

router.get("/check", authMiddleware.authorize, authController.check);

module.exports = router;
