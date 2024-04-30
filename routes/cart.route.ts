import express from 'express'
const router = express.Router()

import {addToCart,getCart} from "../controllers/Cart/AddCart/Cart.controller"
import authenticateToken  from "../middlewares/profileAuthenticator.middleware";

router.post('/addToCart',authenticateToken, addToCart);
router.get('/getCart', authenticateToken, getCart);

export default router;