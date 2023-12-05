const Task = require('../models/taskModel')

// @desc GET Task
// @route GET /api/Task
// @access private

const getTask = async (req, res) => {
    const Tasks = await Task.find()
    res.status(200).json(Tasks)
}

// @desc SET Task
// @route SET /api/Task
// @access private

const setTask = async (req, res) => {
    try {
        const newTaskData = req.body;
        console.log(req.body)
        const newTask = await Task(newTaskData).save();
        
        res.status(200).json({message: `New Task: ${newTask._id}`})
    } catch (error) {
        res.status(500).json({message: `Error: ${error}`})
    }
}

// @desc UPDATE Task
// @route UPDATE /api/Task
// @access private

const updateTask = (req, res) => {
    
    res.status(200).json({message: `Task success ${req.params.id}`})
}

// @desc DELETE Task
// @route DELETE /api/Task
// @access private

const deleteTask = (req, res) => {
    res.status(200).json({message: `Task success ${req.params.id}`})
}

module.exports = {
    getTask,
    setTask,
    updateTask,
    deleteTask
}