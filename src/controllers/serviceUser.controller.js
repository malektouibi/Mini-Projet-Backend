const ServiceUser = require("../models/serviceUser.model")

const getAllServiceUsers = async (req, res) => {
    try {
        const serviceUsers = await ServiceUser.findAll();
        res.status(200).json(serviceUsers);
    } catch (error) {
        res.status(500).json({ msg: error })
    }
};
  
const createServiceUser = async (req, res) => {
    console.log(req.body)
    const { firstName, lastName, email, password } = req.body;
    try {
        const serviceUser = await ServiceUser.create({
            firstName,
            lastName,
            email,
            password,
        })
        console.log("created");
        res.status(201).json(serviceUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
};
  
module.exports = {
    getAllServiceUsers,
    createServiceUser,
};