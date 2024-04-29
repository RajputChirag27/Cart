const isAdmin = require('../middlewares/isAdmin.middleware')
const express = require('express')
const router = express.Router()
const {addProductType, addProduct, getProducts} = require('../controllers/Cart/Product/Product.controller')
const authenticateToken = require("../middlewares/authenticator.middleware");

router.use(authenticateToken);
router.use(isAdmin);

router.post('/addProductType', addProductType);


router.post('/addProduct', addProduct);

router.get('/getProducts', async (req,res)=>{
    const data = await getProducts();
    res.render('Product/getProduct', {product : data})
})

router.get('/getProductsAll', getProducts);


module.exports = router;



// router.put('/updateProducts', updateProducts);
// router.delete('/deleteProducts', deleteProducts);