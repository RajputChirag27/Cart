const express = require('express')
const router = express.Router()
const {addToCart,getCart} = require("../controllers/Cart/AddCart/Cart.controller")
const authenticateToken = require("../middlewares/profileAuthenticator.middleware");

router.post('/addToCart',authenticateToken, addToCart);
router.get('/getCart', authenticateToken, getCart);

module.exports = router;