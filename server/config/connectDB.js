const mongoose=require('mongoose');
require('dotenv').config();
const connectDB= async()=>{
  await  mongoose.connect(process.env.URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }).then((err)=>{
    
        console.log("connected");
    
      });
}

module.exports=connectDB;

