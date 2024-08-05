const appointments=require('../models/appointments');

exports.appointmentController=async (req, res)=>{
    const {studentId, teacherId}=req.params;
    const {appointmentDate, appointmentTime, }=req.body;
    const appointment=new appointments({
        appointmentDate,
        appointmentTime,
        studentId,
        teacherId
    });
    await appointment.save();
    res.json({"msg":"booked!", id:appointment._id});

}
exports.getAppointments=async (req, res)=>{
    try{

        const id=req.user?.id;
        console.log(id);
        const allAppointments=await appointments.find({teacherId:id}).populate('studentId','Name email phone').populate('teacherId','Name email phone').exec();
        console.log('Appointment details:', allAppointments);
        // console.log('Student Name:', allAppointments.studentId.Name);
        // console.log('Teacher Name:', allAppointments.teacherId.Name);
        res.status(200).json({allAppointments});
    }catch(error){
        console.error('fetch appointments', error);
    }

}
exports.confirmAppointment= async (req, res)=>{
    try {
        const id = req.params.id; // Extract id correctly
        const appointment = await appointments.findByIdAndUpdate(id, {
            status: "confirmed"
        }, { new: true }); // Ensure the updated document is returned

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.json({ status: "confirmed" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while confirming the appointment" });
    }

}


exports.disapprove= async (req, res)=>{
    try {
        const id = req.params.id; // Extract id correctly
        const appointment = await appointments.findByIdAndUpdate(id, {
            status: "pending"
        }, { new: true }); // Ensure the updated document is returned

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.json({ status: "pending" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while confirming the appointment" });
    }

}