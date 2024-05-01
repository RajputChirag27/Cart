import express from 'express'
const router = express.Router();
import isAdmin from '../middlewares/isAdmin.middleware';
import authenticateToken from "../middlewares/authenticator.middleware";
import { NextFunction, Request, Response, Router } from 'express';
import { addProductType, addProduct, getProducts } from '../controllers/Cart/Product/Product.controller';
import { AuthenticatedRequest } from '../interfaces/authentication.interface';
import { AuthenticatedResponse } from '../interfaces/authenticationResponse.interface';

router.use(authenticateToken)
router.use(isAdmin);

router.post('/addProductType', addProductType);
router.post('/addProduct', addProduct);

router.get('/getProducts', async (req: AuthenticatedRequest, res: AuthenticatedResponse, next: NextFunction) => {
    try {
     await getProducts(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/getProductsAll', getProducts);

export default router;
