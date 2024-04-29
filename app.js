// app.js

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { start, end } = require("./db/connection");
const logoutRoute = require("./routes/logout.route");
const protectedProfileRoute = require("./routes/profile.route")
const productRoute = require("./routes/product.route")
const cartRoute = require("./routes/cart.route")
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.route");
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Settings


app.use(cookieParser())

app.use("/users", userRoute);

// app.post("/login", userRoute);

// app.use("/users", logoutRoute);

app.get("/index", (req,res)=>{
  res.render('User/login', {message: null});
})

app.get("/signup", (req,res)=>{
  res.render('User/signup');
})



app.use('/products', productRoute);

app.use("/profile/protected", protectedProfileRoute)

app.use("/cart", cartRoute)

app.listen(port, (err) => {
  if (!err) {
    console.log("Connected Successfully on port " + port);
  }
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