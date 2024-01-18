const User = require('../models/user')
const bcrypt = require('bcrypt');

const saltRounds = 10
//routes for admins
module.exports.getUsers = async(req, res)=>{
    let users

    try{
        users = await User.find();
    }catch(err){
        console.log(err)
    }
    if(users){
        res.status(200).send({users})
    }else{
        res.status(404).send("No users found");
    }
}
module.exports.getUsersById = async(req, res)=>{
    let user 
    try{
        user = await User.findOne({email:req.query.email})
    }catch(err){
        console.log(err)
    }
    if (user){
        res.status(200).send({user})
    }
    else{
        res.status(404).send("User does not exist")
    }
}

module.exports.createUser = async(req, res)=>{
    let existingUser

    try{
        existingUser = await User.findOne({email:req.body.email});
    }catch(err){
        console.log(err);
        res.status(500).send({ "message": "Internal Server Error" });
        // res.status(400).send(err)
    }

    if (existingUser){
        res.status(409).send({"message":"User already exists.You can login"})
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
    try{
    const user = await new User({...req.body, password:hashedPassword}).save();
    res.status(201).send({"message":"New User Created"});
    }catch(err){
        console.log(err);
        res.status(500).send({ "message": "Internal Server Error" });
    }
    
}


module.exports.deleteUser = async(req, res)=>{
    try{
        const user = await User.findOneAndDelete({email: req.query.email})
        if (user){
            res.status(200).send("User deleted");
        }else{
            res.status(404).send("User does not exist");
        }

    }catch(err){
        console.log(err)
    }
}

