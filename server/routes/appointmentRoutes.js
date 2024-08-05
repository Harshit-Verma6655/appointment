const express=require('express');
const router = express.Router();

const { appointmentController,confirmAppointment,getAppointments,disapprove} = require('../controllers/appointmentController');
const auth = require('../middlewares/authMiddleware');
// const disapprove=require('../controllers/appointmentController');
router.post('/:studentId/:teacherId', appointmentController);
router.get('/confirmAppointment/:id', confirmAppointment);
router.get('/getAppointments',auth,getAppointments);
router.get('/disapprove/:id',auth,disapprove);
module.exports=router;