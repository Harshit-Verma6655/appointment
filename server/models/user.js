const mongoose=require('mongoose');

const user=new mongoose.Schema({
Name:{
    type:String,
    required:true,
    trim:true

},
email:{
    type:String,
    required:true,
    unique:true
},
phone:{
    type:Number,
    trim:true
},
role:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true
},
createdAt:{
    type:Date,
    default:Date.now()
}

},{timestamps:true});

const User=mongoose.model('User', user);

module.exports=User;