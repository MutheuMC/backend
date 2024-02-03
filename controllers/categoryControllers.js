const Category = require('../models/category')
const Blog = require('../models/blog')

module.exports.getCategories = async(req, res) => {
    let categories;
    try{
        categories = await Category.find();
        // console.log("categories")

    }catch(err){
        console.log(err)
    }

    return res.status(200).send({categories})
}

module.exports.getBlogsByCategories = async(req, res) =>{
    const categories = req.body.id

    try{
        const blogs = await Blog.find().where('categories').equals(categories).select('title description content').exec();
        return res.status(200).send(blogs)
        

    }catch(err){
        console.log(err)
    }
}

