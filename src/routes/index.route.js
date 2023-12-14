const express = require('express');
const router = express.Router();

const taskRouter = require('./task.route.js');
const authRouter = require('./auth.route.js');

const routes = [
    {
        path: '/task',
        route: taskRouter
    },
    {
        path: '/auth',
        route: authRouter
    }
];

routes.forEach(route => {
    router.use(route.path, route.route);
});

module.exports = router;
