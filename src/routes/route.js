const express = require("express");
const app = express()

const userRoute = require("./user.route")
app.use("/user", userRoute)

module.exports = app;