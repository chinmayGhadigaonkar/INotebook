const { Schema } = require('mongoose')

const mongoose =require("mongoose")

const userschema =new Schema({
    name:{
        type :String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    date: {
        type: Date,
        default: Date.now
    }

})
const User = mongoose.model('user', userschema);
module.exports = User;