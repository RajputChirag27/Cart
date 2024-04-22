const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    items : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    }]
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
