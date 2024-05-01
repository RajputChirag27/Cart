import { Document,Types } from "mongoose";



interface ICartItem {
    _id: Types.ObjectId;
    ref: 'Item';
}

interface ICart extends Document {
    profile_id: Types.ObjectId;
    items: ICartItem[];
}

export {ICart};