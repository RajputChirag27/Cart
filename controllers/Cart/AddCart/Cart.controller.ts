import { AuthenticatedRequest } from "../../../interfaces/authentication.interface";
import { AuthenticatedResponse } from "../../../interfaces/authenticationResponse.interface";
import { ICart } from "../../../interfaces/cart.interface";
import { ItemInterface } from "../../../interfaces/item.interface";
import Profile from '../../../models/profile.model';
import Product from '../../../models/product.model';
import ProductType from '../../../models/productType.model';
import Item from '../../../models/item.model';
import Cart from '../../../models/cart.model';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { ProductInterface } from "../../../interfaces/product.interface";
import { Types } from "mongoose";

// Logic for adding items to the cart
const addToCart = async (req: AuthenticatedRequest, res: AuthenticatedResponse): Promise<ICart | void> => {
    try {
        // Fetch the product details
        const productName: string = req.body.name;
        const quantity: number = req.body.quantity;

        // Find the product in the database
        const product   = await Product.findOne({ name: productName });
        if (!product) {
            throw new Error("Product not found");
        }

        // Calculate total price for the item
        const totalPrice: number = (product.price as number) * quantity;

        // Create a new item for the cart
        const newItem : any = new Item({
            product_id: product._id,
            quantity: quantity,
            price: product.price,
            total: totalPrice
        });

        // console.log(newItem._id);

        // Save the new item to the database
        await newItem.save();

        // Find the user's cart
        let cart : any = await Cart.findOne({ profile_id: req.profile.profileId });
        console.log(cart);

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
    } catch (error: any) {
        res.send(error.message);
        throw new Error(error.message);
    }
};

// Logic for retrieving the cart contents
const getCart = async (req: AuthenticatedRequest, res: AuthenticatedResponse): Promise<ICart | void> => {
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ profile_id: req.profile.profileId })
            .populate('items')
            .populate({
                path: 'items',
                populate: {
                    path: 'product_id',
                    model: 'Product'
                }
            });

        let total: number = 0; // Initialize total to a default value

        if (cart) {
            // Calculate total only if cart exists
            total = (cart.items as any).reduce((acc: number, item: any) => acc + item.total, 0);
        }

        res.render('Cart/getCart', { cart, total });
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export {
    addToCart,
    getCart
};

// Function to generate PDF from cart data
const generatePDFFromCart = (cart: ICart): void => {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF document to a writable stream
    const stream = fs.createWriteStream('cart.pdf');
    doc.pipe(stream);

    // Add cart details to the PDF
    doc.fontSize(20).text('Cart Details', { align: 'center' }).moveDown();
    doc.fontSize(14).text(`Profile ID: ${cart.profile_id}`, { align: 'left' }).moveDown();

    // Loop through cart items and add them to the PDF
    cart.items.forEach((item: any, index: number) => {
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
