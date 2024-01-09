const Service = require("../models/serviceModel");

// @desc GET profile
// @route GET /api/profile
// @access private

const getService = async (req, res) => {
    const services = await Service.find();
    res.status(200).json(services);
};

const addService = async (req, res) => {
    const { category, serviceName, serviceDesc, serviceUrl, serviceImg } =
        req.body;

    const service = new Service({
        category,
        serviceName,
        serviceDesc,
        serviceUrl,
        serviceImg,
    });

    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getService,
    addService,
};
