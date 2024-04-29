import { Schema } from "mongoose"
import mongoose from "mongoose"


const productTypeSchema : Schema = new mongoose.Schema({
name : {
    type : String,
    required : true,
    unique : true
}
}, {timestamps: true})

const ProductType = mongoose.model('ProductType', productTypeSchema)

export default ProductType