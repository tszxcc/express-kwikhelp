const Payment = require('../models/paymentModel')

// @desc GET Payment
// @route GET /api/Payment
// @access private

const getPayment = async (req, res) => {

    const Payments = await Payment.find()
    res.status(200).json(Payments)
}

// @desc SET Payment
// @route SET /api/Payment
// @access private

const setPayment = async (req, res) => {
    const newPayment = await Payment({
        amount: 100,
        paymentDescription: "clean the house",
        paymentDate: (new Date()),

    }).save()
    
    res.status(200).json({message: `New Payment: ${newPayment._id}`})
}

module.exports = {
    getPayment,
    setPayment
}