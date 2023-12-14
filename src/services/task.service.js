const taskModel = require('../models/task.model.js');

const getTasks = async () => {
    try {
        const tasks = await taskModel.find();
        return tasks;
    } catch (error) {
        return { error: true, message: error.message};
    }
};

const createTask = async (body) => {
    try {
        const task = await taskModel.create(body.taskData);
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

module.exports = { getTasks, createTask, };