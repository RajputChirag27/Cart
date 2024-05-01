import { Types } from "mongoose";

export interface ItemInterface {
product_id : Types.ObjectId;
quantity : number;
price : number;
total: number;
}

