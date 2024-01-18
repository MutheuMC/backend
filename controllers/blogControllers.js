
const  mongoose  = require('mongoose');
const Blog =  require('../models/blog');
const User = require('../models/user')

module.exports.getBlogs = async(req, res)=>{
    let blogs

    try{
        blogs = await Blog.find();
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server Error");
    }
    
    res.status(200).send({blogs});
}
module.exports.getBlog= async(req, res)=>{
    const blogId = req.params.id
    let blog

    try{
        blog = await Blog.findById({"_id": blogId})
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server Error");
    }
    
    res.status(200).send({blog});
}

module.exports.createBlog = async(req, res)=>{
    let existingUser
    try{
        existingUser = await User.findById(req.body.user).select('blogs').exec()
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Internal server error"})
    }

    if(!existingUser){
        res.status(404).send({message: "User does not exist"})
    }

    const blog = new Blog({...req.body})
    // const existingUser = await findOne({})
    try{
        const session = await mongoose.startSession()
        session.startTransaction()
        await  blog.save({session})

        if (!existingUser.blogs) {
            existingUser.blogs = [];
            }


        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction();

        // const blog = await Blog({...req.body}).save();
        if (blog){
            res.status(200).send("New blog created")
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server Error");
    }
}

module.exports.updateBlog = async(req, res)=>{
    const blogId = req.params.id
    const updateFields = {} 
    if(req.body.title){
        updateFields.title = req.body.title
    }
    if(req.body.description){
        updateFields.description = req.body.description 
    }  
    if(req.body.content){
        updateFields.content = req.body.content 
    }
    if(Object.keys(updateFields).length == 0 ){
        res.status(400).send("No fields to update");
    }

    try{
        const updatedBlog = await Blog.findByIdAndUpdate({"_id":blogId}, {$set: updateFields},{new:true});
        if (!updatedBlog){
            res.status(404).send("Cnnot update the blog");

        }
        res.status(200).send({updatedBlog})

    }catch(err){
        console.log(err);
        res.status(500).send("Internal server Error");
    }
}