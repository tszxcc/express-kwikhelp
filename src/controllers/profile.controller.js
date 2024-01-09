const profileService = require("../services/profile.service.js");
const minioClient = require("../services/minio.service.js");

const getProfile = async (req, res) => {
    const username = req.username;
    const profile = await profileService.getProfile(username);

    if (profile.error) {
        res.status(500).json(profile);
        return;
    }

    res.status(200).json(profile);
};

const getProfileByUsername = async (req, res) => {
    const { username } = req.params;
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

const generateRandomString = () => {
    const length = 20;
    const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};

const getProfilePic = async (req, res) => {
    const username = req.username;

    const profile = await profileService.getProfilePic(username);

    if (profile.error || !profile.profilePic || profile.profilePic === "") {
        res.status(500).json("Profile picture not found");
        return;
    }

    const profilePic = profile.profilePic;

    minioClient.getObject("kwikhelp", profilePic, function (error, stream) {
        if (error) {
            res.status(500).json({
                error: true,
                message: "Error retrieving profile picture",
            });
            return;
        }

        stream.pipe(res);
    });
};

const setProfilePic = async (req, res) => {
    const username = req.username;
    const file = req.file;
    var fileName;

    if (!file) {
        res.status(400).json({
            error: true,
            message: "Missing file",
        });
        return;
    }

    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
        res.status(400).json({
            error: true,
            message: "Invalid file type",
        });
        return;
    }

    const randomString = generateRandomString();

    if (file.mimetype === "image/png") {
        fileName = randomString + ".png";
    }

    if (file.mimetype === "image/jpeg") {
        fileName = randomString + ".jpeg";
    }

    minioClient.putObject("kwikhelp", fileName, file.buffer, function (error) {
        if (error) {
            res.status(500).json({
                error: true,
                message: error,
            });
            return;
        }
    });

    const profile = await profileService.setProfilePic(username, fileName);
    if (profile.error) {
        res.status(500).json(profile);
        return;
    }

    res.status(200);
    res.end();
};

const getResume = async (req, res) => {
    const username = req.username;

    const profile = await profileService.getResume(username);
    if (profile.error || !profile.resume || profile.resume === "") {
        res.status(500).json("Resume not found");
        return;
    }

    const resume = profile.resume;

    minioClient.getObject("kwikhelp", resume, function (error, stream) {
        if (error) {
            res.status(500).json({
                error: true,
                message: "Error retrieving resume",
            });
            return;
        }

        stream.pipe(res);
    });
};

const setResume = async (req, res) => {
    const username = req.username;
    const file = req.file;
    var fileName;

    if (!file) {
        res.status(400).json({
            error: true,
            message: "Missing file",
        });
        return;
    }

    if (file.mimetype !== "application/pdf") {
        res.status(400).json({
            error: true,
            message: "Invalid file type",
        });
        return;
    }

    const randomString = generateRandomString();
    fileName = randomString + ".pdf";

    minioClient.putObject("kwikhelp", fileName, file.buffer, function (error) {
        if (error) {
            res.status(500).json({
                error: true,
                message: error,
            });
            return;
        }
    });

    const profile = await profileService.setResume(username, fileName);

    if (profile.error) {
        res.status(500).json(profile);
        return;
    }

    res.status(200);
    res.end();
};

const getProfilePicByUsername = async (req, res) => {
    const { username } = req.params;

    const profile = await profileService.getProfilePic(username);

    if (profile.error || !profile.profilePic || profile.profilePic === "") {
        res.status(500).json("Profile picture not found");
        return;
    }

    const profilePic = profile.profilePic;

    minioClient.getObject("kwikhelp", profilePic, function (error, stream) {
        if (error) {
            res.status(500).json({
                error: true,
                message: "Error retrieving profile picture",
            });
            return;
        }

        stream.pipe(res);
    });
};

const getResumeByUsername = async (req, res) => {
    const { username } = req.params;

    const profile = await profileService.getResume(username);
    if (profile.error || !profile.resume || profile.resume === "") {
        res.status(500).json("Resume not found");
        return;
    }

    const resume = profile.resume;

    minioClient.getObject("kwikhelp", resume, function (error, stream) {
        if (error) {
            res.status(500).json({
                error: true,
                message: "Error retrieving resume",
            });
            return;
        }

        stream.pipe(res);
    });
};

module.exports = {
    getProfile,
    getProfileByUsername,
    setProfile,
    getProfilePic,
    setProfilePic,
    getResume,
    setResume,
    getProfilePicByUsername,
    getResumeByUsername,
};
