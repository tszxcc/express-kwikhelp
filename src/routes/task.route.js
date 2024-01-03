const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");

const taskRouter = express.Router();

const taskController = require("../controllers/task.controller.js");

// 1. User create task (remove task)
// 2. Helper request task
// 3. User accept helper
// 4. Helper complete task
// 5. User confirm task
// 6. User review task

// getTasks,
// createTask,
// getUserTasks,
// getHelperTasks,
// getHelperRequests,
// getTaskById,
// requestTask,
// acceptTask,
// completeTask,
// confirmTask,
// payTask,
// reviewTask,
// deleteTaskById,

taskRouter.get("/", authMiddleware.authorize, taskController.getTasks);
taskRouter.get("/:id", authMiddleware.authorize, taskController.getTaskById);
taskRouter.get("/user", authMiddleware.authorize, taskController.getUserTasks);
taskRouter.get(
    "/helper",
    authMiddleware.authorize,
    taskController.getHelperTasks
);
taskRouter.get(
    "/helperRequests",
    authMiddleware.authorize,
    taskController.getHelperRequests
);

taskRouter.post("/create", authMiddleware.authorize, taskController.createTask);
taskRouter.post(
    "/request",
    authMiddleware.authorize,
    taskController.requestTask
);
taskRouter.post("/accept", authMiddleware.authorize, taskController.acceptTask);
taskRouter.post(
    "/complete",
    authMiddleware.authorize,
    taskController.completeTask
);
taskRouter.post(
    "/confirm",
    authMiddleware.authorize,
    taskController.confirmTask
);
taskRouter.post("/pay", authMiddleware.authorize, taskController.payTask);
taskRouter.post("/review", authMiddleware.authorize, taskController.reviewTask);

taskRouter.delete(
    "/:id",
    authMiddleware.authorize,
    taskController.deleteTaskById
);

module.exports = taskRouter;
