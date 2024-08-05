const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
exports.register = async (req, res) => {
    const { Name, email, password,phone, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            Name,
            email,
            password,
            phone,
            role
        });
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            // { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: false });
                res.cookie('role',user.role, { httpOnly: false });
                res.status(201).json({ token,  "role":user.role });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user._id,
                role:user.role,
               
            },
        };
        console.log(payload);

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            // { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: false });
                res.cookie('role',user.role, { httpOnly: false });
                res.status(200).json({ token, "role":user.role, name:user.Name,
                    email:user.email });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Logged out' });
};

exports.getTeachers=async (req, res)=>{
    const teachers=await User.find({role:"Teacher"});
    res.json({"allTeachers":teachers, id:req.user.id});
}