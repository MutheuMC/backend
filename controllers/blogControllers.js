const jwtwebtoken = require('jsonwebtoken')

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
    const userId = req.body.user

    const user = await User.findById({"_id": userId})
    

    const new_blog = new Blog({
        title:req.body.title,
        description:req.body.description,
        content: req.body.content,
        user: userId,
        categories:req.body.category

    })

    const savedBlog = await new_blog.save()

    user.blogs.push(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);

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
            res.status(404).send("Cannot update the blog");

        }
        res.status(200).send({updatedBlog})

    }catch(err){
        console.log(err);
        res.status(500).send("Internal server Error");
    }
}

module.exports.deletBlog = async(req, res) =>{
    try{
        const blog = await Blog.findByIdAndDelete({'_id': req.body.id});

        res.status(200).send("Blog deleted")

    }catch(err){
        console.log(err)
    }
}