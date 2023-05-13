const Product = require("../models/product");

function findAllProduct(req, res){
    console.log(req)
    Product.find().then((data) => {
        res.status(200).json({
            error: false,
            message: "Success",
            data: data,
            code: 10,
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            error:true,
            message: "Server error",
            code: 0,
        });
    });
}

function createProduct(req, res){
    console.log("Creating a product...");
    console.log(req.body);
    let product = new Product({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,

    });
    product
        .save()
        .then((data) => {
            return res.status(200).send({
                error: false,
                message: "Success",
                data: data,
                code: 10,
            });
        }).catch((error) => {
        return res.status(500).send({
            error: true,
            message: "Server error",
            code: 0,
        });
    });
}

function findProductById(req, res){
    const id= req.params.id;
    Product.findById(id).then((data) => {
        if(!data)
            res
                .status(404).send({
                message: "Not found" + id,
            });
        else res.send(data);
    })
        .catch((error) => {
            return res.status(500).json({
                message: "Error with the id" + id
            });
        });
}

function findProductByIdAndRemove(req, res){
    const id= req.params.id;
    Product.findByIdAndRemove(id).then((data) => {
        if(!data)
            res
                .status(404).send({
                message: "Not found" + id,
            });
        else res.send(data);
    })
        .catch((error) => {
            return res.status(500).json({
                message: "Error with the id" + id
            });
        });
}

function findProductByIdAndUpdate(req, res){
    const id= req.params.id;
    Product.findByIdAndUpdate(id, req.body).then((data) => {
        if(!data)
            res
                .status(404).send({
                message: "Not found" + id,
            });
        else res.send(data);
    })
        .catch((error) => {
            return res.status(500).json({
                message: "Error with the id" + id
            });
        });
}


module.exports = {
    findAllProduct,
    createProduct,
    findProductById,
    findProductByIdAndRemove,
    findProductByIdAndUpdate,
};