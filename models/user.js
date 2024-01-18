const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email address',
        },

    },
    password:{
        type:String,
        required:true,
        minlength:10,
    },
    blog:[{type:mongoose.Types.ObjectId, ref:"Blog", required:true}]
},
    {timestamps: true})



userSchema.pre('save', function(next){
    this.updatedAt = new Date();
    next();
} )

const User = mongoose.model('User',userSchema)

module.exports = User