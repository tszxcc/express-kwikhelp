const httpStatus = require("../constants/httpStatus.constant.js");

const cookieName = require("../configs/cookieName.config.js");

const authService = require("../services/auth.service.js");

const accessTokenUtil = require("../utils/accessToken.util.js");
const responseUtil = require("../utils/response.util.js");

async function login(req, res) {
    const { username, password } = req.body;

    if (!(await authService.userExist(username))) {
        res.status(httpStatus.BAD_USER_INPUT);

        res.send({ message: "User doesn't exist" });
        return;
    }

    if (await authService.loginUser(username, password)) {
        const refreshToken = await authService.createRefreshToken(username);
        const accessToken = accessTokenUtil.generateAccessToken(username);

        responseUtil.addCookie(
            res,
            cookieName.refreshToken,
            refreshToken,
            1000 * 60 * 60 * 24 * 7
        );
        responseUtil.addCookie(
            res,
            cookieName.accessToken,
            accessToken,
            1000 * 60 * 60
        );

        res.status(httpStatus.OK);
    } else {
        res.status(httpStatus.UNAUTHORIZED);
    }

    res.end();
}

async function register(req, res) {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(httpStatus.BAD_USER_INPUT);

        res.send({ message: "Passwords do not match" });
        return;
    }

    if (await authService.userExist(username)) {
        res.status(httpStatus.BAD_USER_INPUT);

        res.send({ message: "User already exist" });
        return;
    }

    if (await authService.createUser(username, password)) {
        res.status(httpStatus.OK);
        res.end();
        return;
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.end();
}

function logout(req, res) {
    const refreshToken = req.cookies[cookieName.refreshToken];

    authService.revokeRefreshToken(refreshToken);

    responseUtil.removeCookie(res, cookieName.refreshToken);
    responseUtil.removeCookie(res, cookieName.accessToken);

    res.status(httpStatus.OK);
    res.end();
}

function access(req, res) {
    const accessToken = req.cookies[cookieName.accessToken];

    if (accessTokenUtil.verifyAccessToken(accessToken)) {
        res.status(httpStatus.OK);
    } else {
        res.status(httpStatus.UNAUTHORIZED);
    }

    res.end();
}

function refresh(req, res) {
    const refreshToken = req.cookies[cookieName.refreshToken];

    if (!refreshToken) {
        res.status(httpStatus.UNAUTHORIZED);
        res.send({ message: "Refresh token not found" });
        return;
    }

    if (!authService.refreshTokenExist(refreshToken)) {
        res.status(httpStatus.UNAUTHORIZED);
        res.send({ message: "Refresh token not valid" });
        return;
    }

    res.status(httpStatus.OK);
    res.end();
}

function check(req, res) {
    res.status(httpStatus.OK);
    res.send({ message: "Hi " + req.username + ", this's a private route." });
    res.end();
}

module.exports = {
    login,
    register,
    logout,
    access,
    refresh,
    check,
};
