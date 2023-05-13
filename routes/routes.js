const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller');
const productController = require('../controllers/product-controller');

router.get("/hola", (req,res) => {res.send("Hola mundo")});
router.get("/users", userController.findAllUsers);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.findUserById);
router.delete("/users/:id", userController.findUserByIdAndRemove);
router.put("/users/:id", userController.findUserByIdAndUpdate);
router.get("/products", productController.findAllProduct);
router.post("/products", productController.createProduct);
router.get("/products/:id", productController.findProductById);
router.delete("/products/:id", productController.findProductByIdAndRemove);
router.put("/products/:id", productController.findProductByIdAndUpdate);
module.exports = router;
