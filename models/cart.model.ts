import { Schema } from "mongoose";

import mongoose from "mongoose";


const cartSchema: Schema = new mongoose.Schema(
  {
    profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    }]
  },
  { timestamps: true }
);


const Cart = mongoose.model("Cart", cartSchema);



export default Cart;
