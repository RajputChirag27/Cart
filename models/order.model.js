const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
},
profileId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Profile'
},
items : [{
    productId : mongoose.Schema.Types.ObjectId,
    ref : 'Product'
}]
}, {timestamps : true})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order