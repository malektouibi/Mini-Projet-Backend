const ServiceUser = require("../models/serviceUser.model")

const getAllServiceUsers = async (req, res) => {
    try {
        const serviceUsers = await ServiceUser.findAll();
        return res.status(200).json(serviceUsers);
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
};
  
const createServiceUser = async (req, res) => {
    console.log(req.body)
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const serviceUser = await ServiceUser.create({
            firstName,
            lastName,
            email,
            password,
            role,
        })
        return res.status(201).json(serviceUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error })
    }
};

const updateServiceUser = async (req, res) => {
    const id = req.params.id;
    const updatedServiceUser = req.body;
    const result = await ServiceUser.update(updatedServiceUser, { where: { id: id }, returning: true, });
    try {
        if (result[0] === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(201).json({ message: 'User updated', updatedServiceUser: result[1] });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user' });
  }
}

const deleteServiceUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await ServiceUser.destroy({ where: { id: id } });
        if (result === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user' });
    }
}
  
module.exports = {
    getAllServiceUsers,
    createServiceUser,
    updateServiceUser,
    deleteServiceUser
};