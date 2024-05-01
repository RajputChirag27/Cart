import { Types } from 'mongoose';

interface ProductInterface {
    name: string;
    description: string;
    price: number;
    productImage: string;
    productType: Types.ObjectId; // Specify the type explicitly
}

export { ProductInterface };
