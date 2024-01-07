const express = require("express");
const router = express.Router();

const taskRouter = require("./task.route.js");
const authRouter = require("./auth.route.js");
const adminRouter = require("./admin.route.js");
const profileRouter = require("./profile.route.js");
const serviceRouter = require("./service.route.js");

const routes = [
    {
        path: "/task",
        route: taskRouter,
    },
    {
        path: "/auth",
        route: authRouter,
    },
    {
        path: "/admin",
        route: adminRouter,
    },
    {
        path: "/profile",
        route: profileRouter,
    },
    {
        path: "/service",
        route: serviceRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
