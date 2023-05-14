const User = require("../models/user");

function findAllUsers(req, res){
    console.log(req)
    User.find().then((data) => {
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

async function createUser(req, res) {
    console.log("Creating a user...");
    const oldUser = await User.findOne(req.body.email);
    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }

    let user = new User({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    await user
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

function findUserById(req, res){
    const id= req.params.id;
    User.findById(id).then((data) => {
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

function findUserByIdAndRemove(req, res){
    const id= req.params.id;
    User.findByIdAndRemove(id).then((data) => {
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

function findUserByIdAndUpdate(req, res){
    const id= req.params.id;
    User.findByIdAndUpdate(id, req.body).then((data) => {
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

function login(req, res){
    const { email, password } = req.body
    User.findOne({email, password }).then((data) => {
        if(!data)
            res
                .status(404).send({
                message: "Error with the username or password",
            });
        else res.status(200).send({
            message: "Successful login"
        })
    })
        .catch((error) => {
            return res.status(500).json({
                message: "An error occurred"
            });
        });
}

module.exports = {
    login,
    findAllUsers,
    createUser,
    findUserById,
    findUserByIdAndRemove,
    findUserByIdAndUpdate,
};