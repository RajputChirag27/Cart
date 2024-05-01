import { Request, Response } from 'express';
import Product from '../../../models/product.model';
import ProductType from '../../../models/productType.model';
import { AuthenticatedRequest } from "../../../interfaces/authentication.interface";
import { AuthenticatedResponse } from "../../../interfaces/authenticationResponse.interface";
import { ProductInterface } from "../../../interfaces/product.interface";
import {Types} from 'mongoose'

const addProductType = async (req: AuthenticatedRequest, res: AuthenticatedResponse) => {
    try {
        const name: string = req.body.name;
        const newProductType = new ProductType({
            name: name
        });
        const result = await newProductType.save();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductTypes = async (req: AuthenticatedRequest, res: AuthenticatedResponse) => {
    try {
        const result = await ProductType.find();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addProduct = async (req: AuthenticatedRequest, res: AuthenticatedResponse) => {
    try {
        const data : Types.ObjectId | null = await ProductType.findOne({ name: req.body.productName });
        if (data) {
            const newProductData: ProductInterface = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                productImage: req.body.imageUrl,
                productType : data._id, // Assuming productType is a reference to another model
            };
            const newProduct = new Product(newProductData);
            await newProduct.save();
            res.send(newProduct);
        } else {
            res.send("Product Type does not exist");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProducts = async (req: AuthenticatedRequest, res: AuthenticatedResponse) => {
    try {
        const data : ProductInterface[] = await Product.find();
        // res.send(data);
        res.render('Product/getProduct',  {product : data});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { addProduct, getProducts, addProductType, getProductTypes };
