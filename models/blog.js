const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true

    }
}, {timestamps:true})

blogSchema.pre('save', function(next){
    this.updatedAt = new Date();
    next();
})


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;