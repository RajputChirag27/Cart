import { Types , Document } from "mongoose";

export interface ProfileInterface extends Document {
    user_id : Types.ObjectId;
    name : string;
    carts ?: Types.ObjectId;
}