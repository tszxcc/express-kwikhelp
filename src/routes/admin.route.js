const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");

const adminController = require("../controllers/admin.controller.js");

router.get(
    "/userCount",
    authMiddleware.authorize,
    adminController.getUserCount
);
router.get(
    "/helperCount",
    authMiddleware.authorize,
    adminController.getHelperCount
);
router.get(
    "/taskCount",
    authMiddleware.authorize,
    adminController.getTaskCount
);
router.get(
    "/transactionCount",
    authMiddleware.authorize,
    adminController.getTransactionCount
);

module.exports = router;
