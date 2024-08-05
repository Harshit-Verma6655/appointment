const express = require('express');
const router = express.Router();
const { register, login, logout, getTeachers } = require('../controllers/authControllers');
const auth = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', auth, logout);
router.get('/allteachers',auth, getTeachers);
module.exports = router;