const taskService = require('../services/task.service.js');

const getTasks = async (req, res) => {
    const tasks = await taskService.getTasks();

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
    const task = await taskService.createTask(body);

    if (task.error) {
        res.status(500).json({ message: "Task not created" , error: task});
        return;
    }

    res.status(200).json(task);
};

module.exports = { getTasks, createTask};
