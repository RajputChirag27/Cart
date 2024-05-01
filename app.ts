import express from 'express'
import { config } from 'dotenv';
config();
import start from './db/connection';
import cookieParser from 'cookie-parser'
import ejs from 'ejs'
import userRoute from './routes/user.route'
import { Request} from 'express';
import { Response } from 'express';
import protectedProfileRoute from './routes/profile.route'
import productRoute from './routes/product.route'
import cartRoute from './routes/cart.route'
// const express = require("express");
const app = express();
// const dotenv = require("dotenv").config();
// const { start, end } = require("./db/connection");
// const logoutRoute = require("./routes/logout.route");
// const protectedProfileRoute = require("./routes/profile.route")
// const cartRoute = require("./routes/cart.route")
// const cookieParser = require("cookie-parser");
// const userRoute = require("./routes/user.route");
const port : number|string = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Settings


app.use(cookieParser())

app.use("/users", userRoute);

app.use("/profile/protected", protectedProfileRoute)

app.use('/products', productRoute);
app.use("/cart", cartRoute)
// app.post("/login", userRoute);

// app.use("/users", logoutRoute);

app.get("/index", (req : Request,res : Response)=>{
  res.render('User/login', {message: null});
})

app.get("/signup", (req,res)=>{
  res.render('User/signup');
})





app.listen(port, () => {
    console.log("Connected Successfully on port " + port);
});



const startDb = async () => {
  try {
    await start()
    console.log("Db connected Successfully")
  } catch (err) {
    console.log("Db is not connected")
  }
}

startDb()