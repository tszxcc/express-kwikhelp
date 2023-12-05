// const asyncHandler = require('express-async-handler')

const sampleCategory = require('../data/sampleCategory')
const Service = require('../models/serviceModel')

// @desc GET profile
// @route GET /api/profile
// @access private

const getService = async (req, res) => {

    const services = await Service.find()
    res.status(200).json(services)
}

// @desc SET profile
// @route SET /api/profile
// @access private

const setService = async (req, res) => {
    try {   
    await Service.deleteMany();

    const newServices = await Service.insertMany(sampleCategory)
    
    res.status(200).json({message: 'Sample data inserted successfully', newServices});
    } catch (error) {
    res.status(500).json({message: 'Error in inserting sample data', error});
    }
}


module.exports = {
    getService,
    setService
}