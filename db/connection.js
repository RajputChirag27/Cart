const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/cart'

const start = async()=>{
    await mongoose.connect(url)
}

const end = async()=>{
    await mongoose.connection.close()
}


module.exports = {start, end};