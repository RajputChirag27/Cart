// app.js

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { start, end } = require("./db/connection");
const logoutRoute = require("./routes/logout");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Settings
const userRoute = require("./routes/user");

const port = process.env.PORT || 3000;

app.use("/users", userRoute);

app.post("/login", userRoute);

app.use("/users", logoutRoute);

app.listen(port, (err) => {
  if (!err) {
    console.log("Connected Successfully on port " + port);
  }
});
