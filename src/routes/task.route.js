const express = require("express");
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

taskRouter.get("/", taskController.getTasks);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.get("/user", taskController.getUserTasks);
taskRouter.get("/helper", taskController.getHelperTasks);
taskRouter.get("/helperRequests", taskController.getHelperRequests);

taskRouter.post("/create", taskController.createTask);
taskRouter.post("/request", taskController.requestTask);
taskRouter.post("/accept", taskController.acceptTask);
taskRouter.post("/complete", taskController.completeTask);
taskRouter.post("/confirm", taskController.confirmTask);
taskRouter.post("/pay", taskController.payTask);
taskRouter.post("/review", taskController.reviewTask);

taskRouter.delete("/:id", taskController.deleteTaskById);

module.exports = taskRouter;
