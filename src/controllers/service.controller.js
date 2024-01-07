const Service = require("../models/serviceModel");

// @desc GET profile
// @route GET /api/profile
// @access private

const getService = async (req, res) => {
    const services = await Service.find();
    res.status(200).json(services);
};

module.exports = {
    getService,
};
