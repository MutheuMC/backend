// const { findById } = require('../models/category');
const Blog = require('../models/blog');
const User = require('../models/user')
const bcrypt = require('bcrypt');

const saltRounds = 10
//routes for admins

module.exports.createUser = async(req, res)=>{
    let existingUser

    try{
        existingUser = await User.findOne({email:req.body.email});
    }catch(err){
        res.status(400).send(err)
    }

    if (existingUser){
        res.status(409).send({"message":"User already exists.You can login"})
    }else{
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
        const user = await new User({...req.body, password:hashedPassword, blogs: [] }).save();
        res.status(201).send({"message":"New User Created"});
    }

}
module.exports.logUser = async(req, res)=>{
    const {email, password} = req.body
    let user

    try{
        user = await User.findOne({email})
        if (user){
            const comparePassword = bcrypt.compareSync(password, user.password, function(err, result)
            {
                if (err){
                    console.log(err)
                }
                if(result){
                    res.status(200).send("logged in succesfully");
                }else{
                    res.status(401).send("incorrect password");
                }
            })
        }else{
            res.status(404).send("User does not exist");
        }
    }catch(err){
        console.log(err)
    }
}

module.exports.updateUser = async(req, res)=>{
    try{
        const updateUser = await User.findByIdAndUpdate({"_id":req.query.id}, {$set: {username: req.body.username, email:req.body.email}  },{new:true})

        if(!updateUser){
            return  res.status(404).send("User not found")
        }
        return  res.status(200).send({updateUser})

    }catch(err){
        console.error('Error updating user:', err);
        return  res.status(500).send('Internal Server Error');
    }
}
module.exports.getUserBlogs = async(req, res)=>{
    try{
        const user = await User.findById({"_id":req.body.id}).populate('blogs')
        
        return res.status(200).json(user.blogs)
        
    }catch(err){
        console.log(err)
    }


}
