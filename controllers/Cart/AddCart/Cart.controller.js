// Assuming you have already defined Profile, Product, ProductType, Item, and Cart models
const Profile = require('../../../models/profile.model')
const Product = require('../../../models/product.model')
const ProductType = require('../../../models/productType.model')
const Item = require('../../../models/item.model')
const Cart = require('../../../models/cart.model')
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Logic for adding items to the cart
const addToCart = async (req, res) => {
    try {
        // Fetch the product details
        const productName = req.body.name;
        const quantity = req.body.quantity;

        // Find the product in the database
        const product = await Product.findOne({ name: productName });
        if (!product) {
            throw new Error("Product not found");
        }

        // Calculate total price for the item
        const totalPrice = product.price * quantity;

        // Create a new item for the cart
        const newItem = new Item({
            product_id: product._id,
            quantity: quantity,
            price: product.price,
            total: totalPrice
        });

        console.log(newItem._id)

        // Save the new item to the database
        await newItem.save();

        // Find the user's cart
        let cart = await Cart.findOne({ profile_id: req.profile.profileId });
        console.log(cart)
        // If the cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({
                profile_id: req.profile.profileId,
                items: []
            });
        }

        // Add the new item to the cart
        cart.items.push(newItem._id);

        // Update the cart in the database
        await cart.save();
        res.redirect('getCart');
        return cart;
    } catch (error) {
        res.send(error.message)
        throw new Error(error.message);
    }
};

// Logic for retrieving the cart contents
const getCart = async (req, res) => {
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ profile_id: req.profile.profileId })
            .populate('items')
            .populate({
                path: 'items',
                populate: {
                    path: 'product_id', // Assuming 'product_id' is the reference to the Product model in the Item schema
                    model: 'Product'
                }
            });
            const total = cart.items.reduce((acc, item) => acc + item.total, 0);

        if (!cart) {
            throw new Error("Cart not found");
        }
        res.render('Cart/getCart', {cart, total})
        // Example usage
        // generatePDFFromCart(cart);
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    addToCart,
    getCart
};


// Function to generate PDF from cart data
const generatePDFFromCart = (cart) => {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF document to a writable stream
    const stream = fs.createWriteStream('cart.pdf');
    doc.pipe(stream);

    // Add cart details to the PDF
    doc.fontSize(20).text('Cart Details', { align: 'center' }).moveDown();
    doc.fontSize(14).text(`Profile ID: ${cart.profile_id}`, { align: 'left' }).moveDown();

    // Loop through cart items and add them to the PDF
    cart.items.forEach((item, index) => {
        doc.text(`Item ${index + 1}:`, { continued: true }).moveDown();
        doc.text(`Product ID: ${item.product_id}`, { align: 'left' });
        doc.text(`Quantity: ${item.quantity}`, { align: 'left' });
        doc.text(`Price: ${item.price}`, { align: 'left' });
        doc.text(`Total: ${item.total}`, { align: 'left' }).moveDown();
    });

    // Finalize the PDF document
    doc.end();

    console.log('PDF generated successfully.');
};