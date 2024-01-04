// const profileService = require("../services/profile.service.js");

// const getProfile = async (req, res) => {
//     const username = req.username;
//     const profile = await profileService.getProfile(username);

//     if (profile.error) {
//         res.status(500).json(profile);
//     }

//     res.status(200).json(profile);
// };

// const setProfile = async (req, res) => {
//     const username = req.username;
//     const {phoneNumber, } = req.body;

//     const profile = await profileService.setProfile(username, body);
// };

// module.exports = {
//     getProfile,
//     setProfile,
//     updateProfile,
//     deleteProfile,
//     setResume,
// };
