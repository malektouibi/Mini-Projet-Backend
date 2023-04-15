const bcrypt = require('bcryptjs')
const ServiceUser = require('../models/serviceUser.model')

const getAllServiceUsers = async (req, res) => {
    try {
        const serviceUsers = await ServiceUser.findAll();
        return res.status(200).json(serviceUsers);
    } catch (error) {
        return res.status(500).json({ message: error })
    }
};
  
const createServiceUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const serviceUser = await ServiceUser.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        })
        return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
};

const updateServiceUser = async (req, res) => {
    const id = req.params.id;
    const updatedServiceUser = req.body;
    const result = await ServiceUser.update(updatedServiceUser, { where: { id: id }, returning: true, });
    try {
        if (result[0] === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(201).json({ message: 'User updated successfully.', updatedServiceUser: result[1] });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user.' });
  }
}

const deleteServiceUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await ServiceUser.destroy({ where: { id: id } });
        if (result === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user.' });
    }
}
  
module.exports = {
    getAllServiceUsers,
    createServiceUser,
    updateServiceUser,
    deleteServiceUser
};