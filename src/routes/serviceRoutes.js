//same like import - common js module syntax
const express = require('express')
const router = express.Router()
const { getService, setService } = require('../controllers/serviceController')

router.route('/').get(getService).post(setService);

router.get('/', (req, res) => {
    res.status(200).json({message: 'Get services successful'})
})

router.post('/', (req, res) => {
    res.status(200).json({message: 'Set services successful'})
 })

// //include a variable - use backtick
// router.put('/:id', (req, res) => {
//     res.status(200).json({message: `Update goal ${req.params.id}`})
// })

// router.delete('/:id', (req, res) => {
//     res.status(200).json({message: `Delete goal ${req.params.id}`})
// })



module.exports = router