import { Document,Types } from "mongoose";



interface ICartItem {
    _id: Types.ObjectId;
    ref: string;
}

interface ICart extends Document {
    profile_id: Types.ObjectId;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

export {ICart};