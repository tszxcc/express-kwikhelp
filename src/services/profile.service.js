const Credential = require("../models/credential.model.js");

const getProfile = async (username) => {
    try {
        const profile = await Credential.findOne({
            username: username,
        }).select({
            username: 1,
            role: 1,
            email: 1,
            phone: 1,
            description: 1,
            fullName: 1,
            _id: 0,
        });

        return profile;
    } catch (err) {
        return { error: true, message: err.message };
    }
};

const setProfile = async (username, body) => {
    try {
        const profile = await Credential.findOneAndUpdate(
            {
                username: username,
            },
            {
                email: body.email,
                phone: body.phone,
                description: body.description,
                fullName: body.fullName,
            }
        );

        return profile;
    } catch (err) {
        return { error: true, message: err.message };
    }
};

const getProfilePic = async (username) => {
    try {
        const profilePic = await Credential.findOne({
            username: username,
        }).select({
            profilePic: 1,
            _id: 0,
        });

        return profilePic;
    } catch (err) {
        return { error: true, message: err.message };
    }
};

const setProfilePic = async (username, profilePicUrl) => {
    try {
        const profilePic = await Credential.findOneAndUpdate(
            {
                username: username,
            },
            {
                profilePic: profilePicUrl,
            }
        );

        return profilePic;
    } catch (err) {
        return { error: true, message: err.message };
    }
};

const getResume = async (username) => {
    try {
        const resume = await Credential.findOne({
            username: username,
        }).select({
            resume: 1,
            _id: 0,
        });

        return resume;
    } catch (err) {
        return { error: true, message: err.message };
    }
};

const setResume = async (username, resumeUrl) => {
    try {
        const resume = await Credential.findOneAndUpdate(
            {
                username: username,
            },
            {
                resume: resumeUrl,
            }
        );

        return resume;
    } catch (err) {
        return { error: true, message: err.message };
    }
};

module.exports = {
    getProfile,
    setProfile,
    getProfilePic,
    setProfilePic,
    getResume,
    setResume,
};
