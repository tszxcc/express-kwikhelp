//same like import - common js module syntax
const express = require('express')
const router = express.Router()
const { getProfile, setProfile, updateProfile, deleteProfile, setResume } = require('../controllers/profileController')

router.route('/').get(getProfile).post(setProfile, setResume)
router.route('/:id').put(updateProfile).delete(deleteProfile)

router.get('/', (req, res) => {
    res.status(200).json({message: 'Read profile successful'})
})

router.post('/', (req, res) => {
    res.status(200).json({message: 'Set profile'})
})

//include a variable - use backtick
router.put('/:id', (req, res) => {
    res.status(200).json({message: `Update profile ${req.params.id}`})
})

router.delete('/:id', (req, res) => {
    res.status(200).json({message: `Delete profile ${req.params.id}`})
})





module.exports = router