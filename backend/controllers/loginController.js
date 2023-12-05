// @desc SET login
// @route POST /api/login
// @access private

const setLogin = (req, res) => {
    res.status(200).json({message: `Login success ${req.params.id}`})
}

const getLogin = (req, res) => {
    res.status(200).json({message: `Login success`})
}

module.exports = {
    setLogin,
    getLogin
}