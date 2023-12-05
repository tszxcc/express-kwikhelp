const express = require('express')
const cors = require('cors')
const multer = require('multer')
const cookieParser = require('cookie-parser')

const connectDB = require('./configs/db')
const routes = require('./routes/index.route.js')
const port = process.env.PORT || 5000

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}))

// for parsing cookies to the req
app.use(cookieParser())
// have to use this to get req.body or else it will be undefined or body data will be empty
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// multer for form-data
app.use(multer().array())

app.use('/api', routes)

// // Routes (Bryan commented this out)
// app.use('/api/login', require('./routes/loginRoutes'))
// app.use('/api/profile', require('./routes/profileRoutes'))
// app.use('/api/task', require('./routes/taskRoutes'))
// app.use('/api/payment', require('./routes/paymentRoutes'))
// app.use('/api/resume', require('./routes/profileRoutes'))
app.use('/api/service', require('./routes/serviceRoutes'))

const startServer = async () => {
    await connectDB()
    app.listen(port, () => console.log(`Server running on port ${port}`))
}

startServer()