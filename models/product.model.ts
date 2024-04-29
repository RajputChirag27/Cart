import mongoose from "mongoose"
import { Schema } from "mongoose"

const productSchema : Schema = new mongoose.Schema({
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
    productImage:{
        type:String,
    },
    productType : {
        type: mongoose.Schema.Types.String,
        ref: 'ProductType',
        required: true
    },
}, {timestamps :true})

const Product = mongoose.model('Product', productSchema)

export default Product