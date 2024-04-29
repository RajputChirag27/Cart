import mongoose, { Schema } from "mongoose"

const orderSchema : Schema = new mongoose.Schema({
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

export default Order;