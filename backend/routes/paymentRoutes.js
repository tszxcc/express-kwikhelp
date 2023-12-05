//same like import - common js module syntax
const express = require('express')
const router = express.Router()
const { getPayment, setPayment } = require('../controllers/paymentController')

router.route('/').get(getPayment).post(setPayment)

router.get('/', (req, res) => {
    res.status(200).json({message: 'Read Payment successful'})
})

router.post('/', (req, res) => {
    res.status(200).json({message: 'Set Payment'})
})


module.exports = router