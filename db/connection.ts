import mongoose from "mongoose"

const url : string = 'mongodb://localhost:27017/cart'

const start = async(): Promise<void>=>{
    await mongoose.connect(url)
}

const end = async()=>{
    await mongoose.connection.close()
}


export default start;
