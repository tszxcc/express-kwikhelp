//same like import - common js module syntax
const express = require('express')
const router = express.Router()
const { getTask, setTask, updateTask, deleteTask } = require('../controllers/taskController')

router.route('/').get(getTask).post(setTask)


router.route('/:id').put(updateTask).delete(deleteTask)

//include a variable - use backtick
router.put('/:id', (req, res) => {
    res.status(200).json({message: `Update task ${req.params.id}`})
})

router.delete('/:id', (req, res) => {
    res.status(200).json({message: `Delete task ${req.params.id}`})
})



module.exports = router