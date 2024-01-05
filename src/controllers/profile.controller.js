const profileService = require("../services/profile.service.js");

const getProfile = async (req, res) => {
    const username = req.username;
    const profile = await profileService.getProfile(username);

    if (profile.error) {
        res.status(500).json(profile);
        return;
    }

    res.status(200).json(profile);
};

const setProfile = async (req, res) => {
    const username = req.username;
    const { email, phone, description, fullName } = req.body;

    if (!email || !phone || !description || !fullName) {
        res.status(400).json({
            error: true,
            message: "Missing required fields",
        });
        return;
    }

    const profile = await profileService.setProfile(username, req.body);

    if (profile.error) {
        res.status(500).json(profile);
        return;
    }

    res.status(200).json(profile);
};

const getProfilePic = async (req, res) => {
    const username = req.username;
    const profilePic = await profileService.getProfilePic(username);

    if (profilePic.error) {
        res.status(500).json(profilePic);
        return;
    }

    res.status(200).json(JSON.parse(profilePic));
};

const setProfilePic = async (req, res) => {
    const username = req.username;
    // const profilePicId = req.file.id;

    if (!req.files) {
        res.status(400).json({
            error: true,
            message: "Missing required image",
        });
        return;
    }

    const profilePic = await profileService.setProfilePic(
        username
        // profilePicId
    );

    if (profilePic.error) {
        res.status(500).json(profilePic);
        return;
    }

    res.status(200);
    res.end();
};

const getResume = async (req, res) => {
    const username = req.username;
    const role = req.role;

    if (role !== "helper") {
        res.status(403).json({
            error: true,
            message: "Forbidden",
        });
        return;
    }

    const resume = await profileService.getResume(username);

    if (resume.error) {
        res.status(500).json(resume);
        return;
    }

    res.status(200);
    res.end();
};

const setResume = async (req, res) => {
    const username = req.username;
    const role = req.role;

    if (role !== "helper") {
        res.status(403).json({
            error: true,
            message: "Forbidden",
        });
        return;
    }

    res.status(200);
    res.end();
};

module.exports = {
    getProfile,
    setProfile,
    getProfilePic,
    setProfilePic,
    getResume,
    setResume,
};
