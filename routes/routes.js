const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get("/hola", (req,res) => {res.send("Hola mundo")});
router.get("/users", userController.findAllUsers);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.findUserById);
router.delete("/users/:id", userController.findUserByIdAndRemove);
router.put("/users/:id", userController.findUserByIdAndUpdate);

module.exports = router;
