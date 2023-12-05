const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

// check access token
router.post('/access', authController.access)
// checl refresh token
router.post('/refresh', authController.refresh);

router.get('/check', authMiddleware.authorize, authController.check);

module.exports = router;