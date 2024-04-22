// app.js

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { start, end } = require("./db/connection");
const logoutRoute = require("./routes/logout.route");
const protectedProfileRoute = require("./routes/profile.route")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Settings
const userRoute = require("./routes/user.route");

const port = process.env.PORT || 3000;

app.use("/users", userRoute);

// app.post("/login", userRoute);

app.use("/users", logoutRoute);

app.use("/profile/protected", protectedProfileRoute)

app.listen(port, (err) => {
  if (!err) {
    console.log("Connected Successfully on port " + port);
  }
});
