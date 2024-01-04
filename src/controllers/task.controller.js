const taskService = require("../services/task.service.js");

const getTasks = async (req, res) => {
    const tasks = await taskService.getAllTasks();

    if (tasks.error) {
        res.status(500).json({ message: "Tasks not found" });
        // make sure to return here so that the code stops running
        // and doesn't try to send the response again, which the status 200 below
        return;
    }

    res.status(200).json(tasks);
};

const createTask = async (req, res) => {
    const body = req.body;
    const username = req.username;
    const task = await taskService.createTask(body, username);

    if (task.error) {
        res.status(500).json({ message: "Task not created", error: task });
        return;
    }

    res.status(200).json(task);
};

const getUserTasks = async (req, res) => {
    const username = req.username;
    const tasks = await taskService.getUserTasks(username);

    if (tasks.error) {
        res.status(500).json({ message: "Tasks not found" });
        return;
    }

    res.status(200).json(tasks);
};

const getHelperTasks = async (req, res) => {
    const username = req.username;
    const tasks = await taskService.getHelperTasks(username);

    if (tasks.error) {
        res.status(500).json({ message: "Tasks not found" });
        return;
    }

    res.status(200).json(tasks);
};

const getUserRequests = async (req, res) => {
    const username = req.username;
    const tasks = await taskService.getUserRequests(username);

    if (tasks.error) {
        res.status(500).json(tasks);
        return;
    }

    res.status(200).json(tasks);
};

const getHelperRequests = async (req, res) => {
    const username = req.username;
    const tasks = await taskService.getHelperRequests(username);

    if (tasks.error) {
        res.status(500).json({ message: "Tasks not found" });
        return;
    }

    res.status(200).json(tasks);
};

const getTaskById = async (req, res) => {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);

    if (task.error) {
        res.status(500).json(task);
        return;
    }

    res.status(200).json(task);
};

const requestTask = async (req, res) => {
    const helper = req.username;
    const { taskId, username } = req.body;
    const task = await taskService.requestTask(taskId, username, helper);

    if (task.error) {
        res.status(500).json(task);
        return;
    }

    res.status(200).json(task);
};

const acceptTask = async (req, res) => {
    const username = req.username;
    const { taskId, helper } = req.body;
    const task = await taskService.acceptTask(taskId, username, helper);

    if (task.error) {
        res.status(500).json({ message: "Task not accepted" });
        return;
    }

    res.status(200).json(task);
};

const completeTask = async (req, res) => {
    const username = req.username;
    const { taskId } = req.body;
    const task = await taskService.completeTask(taskId, username);

    if (task.error) {
        res.status(500).json({ message: "Task not completed" });
        return;
    }

    res.status(200).json(task);
};

const confirmTask = async (req, res) => {
    const username = req.username;
    const { taskId } = req.body;
    const task = await taskService.confirmTask(taskId, username);

    if (task.error) {
        res.status(500).json({ message: "Task not confirmed" });
        return;
    }

    res.status(200).json(task);
};

const payTask = async (req, res) => {
    // res.status(123).json({ message: "Endpoint Building" });

    const username = req.username;
    const { taskId, amount } = req.body;
    const task = await taskService.attemptPayTask(taskId, username, amount);

    if (task.error) {
        res.status(500).json({ message: "Task not paid" });
        return;
    }

    res.status(200).json(task);
};

const reviewTask = async (req, res) => {
    const username = req.username;
    const { taskId, rate } = req.body;
    const task = await taskService.reviewTask(taskId, username, rate);

    if (task.error) {
        res.status(500).json({ message: "Task not reviewed" });
        return;
    }

    res.status(200).json(task);
};

const deleteTaskById = async (req, res) => {
    const username = req.username;
    const { id } = req.params;
    const task = await taskService.deleteTaskById(id, username);

    if (task.error) {
        res.status(500).json({ message: "Task not deleted" });
        return;
    }

    res.status(200).json(task);
};

const callback = async (req, res) => {
    const { id } = req.body;
    const billId = id;
    const task = await taskService.callback(billId);

    if (task.error) {
        res.status(500).json(task);
        return;
    }

    res.status(200).json(task);
};

module.exports = {
    getTasks,
    createTask,
    getUserTasks,
    getHelperTasks,
    getUserRequests,
    getHelperRequests,
    getTaskById,
    requestTask,
    acceptTask,
    completeTask,
    confirmTask,
    payTask,
    reviewTask,
    deleteTaskById,
    callback,
};
