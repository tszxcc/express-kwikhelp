const taskModel = require("../models/task.model.js");
const taskRequestModel = require("../models/taskRequest.model.js");

const createTask = async (body) => {
    try {
        const task = await taskModel.create(body.taskData);
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getAllTasks = async () => {
    try {
        const tasks = await taskModel.find();
        return tasks;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getUserTasks = async (username) => {
    try {
        const tasks = await taskModel.find({ username: username });
        return tasks;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getHelperTasks = async (username) => {
    try {
        const tasks = await taskModel.find({ helper: username });
        return tasks;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getHelperRequests = async (username) => {
    try {
        const tasks = await taskRequestModel.find({ helper: username });
        return tasks;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getTaskById = async (id) => {
    try {
        const task = await taskModel.findById({ id: id });
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const requestTask = async (id, username, helper) => {
    try {
        const taskRequest = await taskRequestModel.create({
            taskID: id,
            username: username,
            helper: helper,
        });
        return taskRequest;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const acceptTask = async (id, username, helper) => {
    try {
        const task = await taskModel.findOneAndUpdate(
            { _id: id, username: username, taskStatus: "Open" },
            { helper: helper, taskStatus: "Accepted" }
        );

        const taskRequest = await taskRequestModel.findOneAndUpdate(
            { taskID: id, username: username, helper: helper },
            { requestStatus: "Accepted" }
        );

        // remove else
        const taskRequestRemoved = await taskRequestModel.deleteMany({
            taskID: id,
            username: username,
            requestStatus: "Pending",
        });

        return { task, taskRequest, taskRequestRemoved };
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const completeTask = async (id, helper) => {
    try {
        const task = await taskModel.findOneAndUpdate(
            { _id: id, helper: helper },
            { taskStatus: "Completed" }
        );
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const confirmTask = async (id, username) => {
    try {
        const task = await taskModel.findOneAndUpdate(
            { _id: id, username: username },
            { taskStatus: "Confirmed" }
        );
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const payTask = async (id, username) => {
    try {
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const reviewTask = async (id, username, rate) => {
    try {
        const task = await taskModel.findOneAndUpdate(
            { _id: id, username: username, taskStatus: "Paid" },
            { taskStatus: "Reviewed", review: rate }
        );
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const deleteTaskById = async (id, username) => {
    try {
        const task = await taskModel.findOneAndDelete({
            _id: id,
            username: username,
            taskStatus: "Open",
        });

        const taskRequest = await taskRequestModel.deleteMany({
            taskID: id,
            username: username,
        });
        return { task, taskRequest };
    } catch (error) {
        return { error: true, message: error.message };
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getUserTasks,
    getHelperTasks,
    getHelperRequests,
    getTaskById,
    requestTask,
    acceptTask,
    completeTask,
    confirmTask,
    payTask,
    reviewTask,
    deleteTaskById,
};
