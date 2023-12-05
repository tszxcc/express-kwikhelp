// const asyncHandler = require('express-async-handler')

const Profile = require('../models/profileModel')

// @desc GET profile
// @route GET /api/profile
// @access private

const getProfile = async (req, res) => {

    const profiles = await Profile.find()
    res.status(200).json(profiles)
}

// @desc SET profile
// @route SET /api/profile
// @access private

const setProfile = async (req, res) => {
    const newProfile = await Profile({
        fullname : '',
        email : '',
        description : '',
        phonenumber : '',        
    }).save()
    
    res.status(200).json({message: `New Profile: ${newProfile._id}`})
}

// @desc UPDATE profile
// @route UPDATE /api/profile
// @access private

const updateProfile = (req, res) => {
    res.status(200).json({message: `Profile success ${req.params.id}`})
}

// @desc DELETE profile
// @route DELETE /api/profile
// @access private

const deleteProfile = (req, res) => {
    res.status(200).json({message: `Profile success ${req.params.id}`})
}

const setResume = (req, res) => {
    // const newResume = await 
    res.status(200).json({message: `Resume success ${req.params.id}`})
}

module.exports = {
    getProfile,
    setProfile,
    updateProfile,
    deleteProfile,
    setResume,
}