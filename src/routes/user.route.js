const express = require("express");
const route = express.Router()

const authController = require("../controllers/auth.controller")
route.post("/login", authController.authentication)

const userController = require("../controllers/user.controller")
route.get("/getAll", userController.getAllUser)
route.post("/add", userController.addUser)
route.put("/update/:id", userController.updateUser)
route.delete("/delete/:id", userController.deleteUser)

module.exports = route;