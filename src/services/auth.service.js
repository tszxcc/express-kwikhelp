const Token = require("../models/token.model.js");
const Credential = require("../models/credential.model.js");

const bcrypt = require("bcrypt");
const crypto = require("node:crypto");

async function registerUser(username, password, role, email, phoneNumber) {
    const pepper = generatePepper();
    const passwordHash = hashPassword(password, pepper);

    const credential = new Credential({
        username: username,
        role: role,
        passwordHash: passwordHash,
        pepper: pepper,
        email: email,
        phone: phoneNumber,
    });

    await credential.save();
    return true;
}

async function loginUser(username, password) {
    const passwordHash = await getUserPasswordHash(username);
    if (!passwordHash) {
        return false;
    }

    if (
        verifyPassword(password, passwordHash.pepper, passwordHash.passwordHash)
    ) {
        const role = (
            await Credential.findOne({ username: username }).select("role")
        ).role;

        return role;
    }

    return false;
}

async function refreshTokenExist(token) {
    const tokenExist = await Token.exists({ token: token });
    if (tokenExist) {
        const username = (
            await Token.findOne({ token: token }).select("username")
        ).username;

        const role = (
            await Credential.findOne({
                username: username,
            }).select("role")
        ).role;

        return {
            username: username,
            role: role,
        };
    }

    return false;
}

/**
 * @param {string} username
 * @returns {string} refreshToken - refresh token
 * @returns {boolean} false - if failed to create refresh token
 */
async function createRefreshToken(username) {
    const refreshToken = crypto.randomBytes(64).toString("hex");

    const token = new Token({
        username: username,
        token: refreshToken,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    const tokenSave = await token.save();
    if (!tokenSave) {
        return false;
    }

    return refreshToken;
}

async function revokeRefreshToken(token) {
    const tokenDelete = await Token.deleteOne({
        token: token,
    });

    if (tokenDelete.deletedCount === 0) {
        return false;
    }

    return true;
}

async function userExist(username, email) {
    var exist;
    if (email) {
        exist = await Credential.exists({ username: username, email: email });
    } else {
        exist = await Credential.exists({ username: username });
    }

    if (exist) {
        return true;
    }

    return false;
}

function generatePepper() {
    return crypto.randomBytes(16).toString("hex");
}

/**
 * @param {string} password
 * @param {string} pepper
 * @returns {string} hashedPassword - hashed password with pepper and salt
 */
function hashPassword(password, pepper) {
    const pepperedPassword = crypto
        .createHmac("sha256", pepper)
        .update(password)
        .digest("hex");

    const hashedPassword = bcrypt.hashSync(pepperedPassword, 10);

    return hashedPassword;
}

/**
 * @param {string} inputPassword
 * @param {string} pepper
 * @param {string} dbHashedPassword
 * @returns {boolean} isSame - true if inputPassword is the same as dbHashedPassword, false if inputPassword is not the same as dbHashedPassword
 */
function verifyPassword(inputPassword, pepper, dbHashedPassword) {
    const pepperedPassword = crypto
        .createHmac("sha256", pepper)
        .update(inputPassword)
        .digest("hex");

    const isSame = bcrypt.compareSync(pepperedPassword, dbHashedPassword);

    return isSame;
}

/**
 * @param {string} username
 * @returns {object} passwordHash - passwordHash and pepper
 * @returns {boolean} false - if user does not exist
 */
async function getUserPasswordHash(username) {
    const credential = await Credential.findOne({ username: username });
    if (!credential) {
        return false;
    }

    const passwordHash = credential.passwordHash;
    const pepper = credential.pepper;

    return {
        passwordHash: passwordHash,
        pepper: pepper,
    };
}

module.exports = {
    userExist,
    registerUser,
    loginUser,
    refreshTokenExist,
    createRefreshToken,
    revokeRefreshToken,
    generatePepper,
};
