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

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    categories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }]
}, {timestamps:true})

blogSchema.pre('save', function(next){
    this.updatedAt = new Date();
    next();
})
//validation of data
// blogSchema.pre('save', function(next){

// })


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;