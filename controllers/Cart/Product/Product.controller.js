const mongoose = require('mongoose');
const { start } = require('../../../db/connection')
const Product = require('../../../models/product.model');
const ProductType = require('../../../models/productType.model');

const addProductType = async (req, res) => {
    try {
        const name = req.body.name;
        // console.log(name)
        const newProductType = new ProductType({
            name: name
        });
        const result = await newProductType.save();
        res.send(result);
    } catch (err) {
        console.log(err)
    }

}

const getProductTypes = async (req, res) => {
    const result = await ProductType.find();
    res.send(result)
}

const addProduct = async (req, res) => {
    try {
        const data = await ProductType.findOne({ name: req.body.productName });
        // console.log(data)
        // console.log(data._id)
        if (data) {
            const newProduct = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                productType: data._id,
            })
            await newProduct.save();
            res.send(newProduct);
        } else {
            res.send("Product Type not Exists")
        }
    } catch (err) {
        console.log(err);
        res.send(err)
    }


}

const getProducts = async (req, res) => {
    try {
        const data = await Product.find()
        res.send(data)
    } catch (err) {
        console.log(err)
    }
}


module.exports = { addProduct, getProducts, addProductType, getProductTypes };