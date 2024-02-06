// const { findById } = require('../models/category');
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog');
const User = require('../models/user')
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY

const saltRounds = 10

module.exports.authenticateJWT = async(req, res , next)=>{
    const token = req.cookie.accessToken

    if(!token){
        res.status(401).send("Log In");
    }

    jwt.verify(token , secretKey, (err, user) => {
        if(err){
            return  res.send("403")
        }

        // req.user = user
        next();

    });
}
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
    let user;
    try{
        user = await User.findOne({email})

        const passwordVerify = bcrypt.compareSync(password, user.password)
        if (passwordVerify){
            const accessToken = jwt.sign({'_id':user._id}, secretKey, {expiresIn: '15m'});
            res.cookie('accessToken', accessToken, { httpOnly: true });
            res.status(200).send("logged In Successfully")
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

module.exports.logout = async(req, res)=> {
    res.clearCookie('accessToken');
    res.send("logged out");
}

module.exports.deleteAccount = async(req, res)=>{
    console.log("account deleted")
}
