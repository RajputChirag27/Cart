const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique: true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    productType : {
        type: mongoose.Schema.Types.String,
        ref: 'ProductType',
        required: true
    },
}, {timestamps :true})

const Product = mongoose.model('Product', productSchema)

module.exports = Product