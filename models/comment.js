const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name:{
        type:String,
        required
    },
    content:{
        type:String,
    }

    
})

const comment = mongoose.Model('Comment', commentSchema);

module.exports = comment