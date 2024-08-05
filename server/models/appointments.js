const mongoose=require('mongoose');

const appointmentSchema=new mongoose.Schema({

appointmentDate:{
    type:Date,
    required:true
},
appointmentTime:{
    type:String,
},
status:{
    type:String,
    default:"pending"
},
studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
teacherId:{
     type:mongoose.Schema.Types.ObjectId,
    ref:'User'
}
},{timestamps:true})

const appointments=mongoose.model('appointment', appointmentSchema);
module.exports=appointments;