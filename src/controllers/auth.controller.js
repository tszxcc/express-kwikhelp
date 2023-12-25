const httpStatus = require("../constants/httpStatus.constant.js");

const cookieName = require("../configs/cookieName.config.js");

const authService = require("../services/auth.service.js");

const accessTokenUtil = require("../utils/accessToken.util.js");
const responseUtil = require("../utils/response.util.js");

async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(httpStatus.BAD_USER_INPUT);

        res.send({ message: "Missing field/s" });
        return;
    }

    if (!(await authService.userExist(username))) {
        res.status(httpStatus.BAD_USER_INPUT);

        res.send({ message: "User doesn't exist" });
        return;
    }

    const loginSuccess = await authService.loginUser(username, password);

    if (loginSuccess) {
        // if login success, create refresh token and access token
        const refreshToken = await authService.createRefreshToken(username);

        const accessToken = accessTokenUtil.generateAccessToken(
            username,
            loginSuccess
        );

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
        // if login failed, send 401
        res.status(httpStatus.UNAUTHORIZED);
    }

    res.end();
}

async function register(req, res) {
    const { username, password, confirmPassword, role } = req.body;

    if (!username || !password || !confirmPassword || !role) {
        res.status(httpStatus.BAD_USER_INPUT);

        res.send({ message: "Missing field/s" });
        return;
    }

    if (password !== confirmPassword) {
        res.status(httpStatus.BAD_USER_INPUT);

        res.send({ message: "Passwords do not match" });
        return;
    }

    if (role !== "helper" && role !== "user") {
        res.status(httpStatus.BAD_USER_INPUT);

        res.send({ message: "Role not valid" });
        return;
    }

    if (await authService.userExist(username)) {
        res.status(httpStatus.BAD_USER_INPUT);

        res.send({ message: "User already exist" });
        return;
    }

    if (await authService.registerUser(username, password, role)) {
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

async function refresh(req, res) {
    const refreshToken = req.cookies[cookieName.refreshToken];

    if (!refreshToken) {
        res.status(httpStatus.UNAUTHORIZED);
        res.send({ message: "Refresh token not found" });
        return;
    }

    if (!(await authService.refreshTokenExist(refreshToken))) {
        res.status(httpStatus.UNAUTHORIZED);
        res.send({ message: "Refresh token not valid" });
        return;
    }

    res.status(httpStatus.OK);
    res.end();
}

function check(req, res) {
    res.status(httpStatus.OK);
    res.send({
        message:
            "Hi " +
            req.username +
            " (" +
            req.role +
            "), this's a private route.",
    });
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
