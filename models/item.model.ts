import { Schema } from "mongoose";
import mongoose from "mongoose";

const itemSchema: Schema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


const Item = mongoose.model('Item', itemSchema)

export default Item;
