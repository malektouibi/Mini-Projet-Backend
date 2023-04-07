const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const ServiceUser = require("../models/serviceUser.model");

const loginServiceUser = async (req, res) => {
    try {
        const email = req.body.email;
        const serviceUser = await ServiceUser.findOne({ where: { email: email },  attributes: ['id', 'email', 'password'] });
        console.log(serviceUser);
        if (!serviceUser) {
            return res.status(404).json({ message: 'Invalid credentials.' });
        }
        const isValidPassword = await bcrypt.compare(req.body.password, serviceUser.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const token = await generateToken(serviceUser);
        return res.status(200).json({ message: 'Logged in successfully.', token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error logging in.' });
    }
}

const generateToken = async (serviceUser) => {
    const payload = { id: serviceUser.id };
    const secret = process.env.JWT_SECRET;
    return await jwt.sign(payload, secret, { expiresIn: '1h' });
}

module.exports = loginServiceUser;