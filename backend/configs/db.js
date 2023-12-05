const mongoose = require('mongoose')


const mongoURI = 'mongodb+srv://ts123:ts123@kwikhelp.8tx1juu.mongodb.net/kwikhelp?retryWrites=true&w=majority'

const connectDB = async () => { 
    await mongoose.connect(process.env.MONGO_URI || mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))
}

module.exports = connectDB