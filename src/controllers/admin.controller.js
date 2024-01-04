const adminService = require("../services/admin.service.js");

const getUserCount = async (req, res) => {
    try {
        const count = await adminService.getUserCount();
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHelperCount = async (req, res) => {
    try {
        const count = await adminService.getHelperCount();
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTaskCount = async (req, res) => {
    try {
        const count = await adminService.getTaskCount();
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTransactionCount = async (req, res) => {
    try {
        const count = await adminService.getTransactionCount();
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserCount,
    getHelperCount,
    getTaskCount,
    getTransactionCount,
};
