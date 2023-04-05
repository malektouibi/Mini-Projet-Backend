const express = require('express');
const { getAllServiceUsers, createServiceUser, updateServiceUser, deleteServiceUser } = require('../controllers/serviceUser.controller');
const router = express.Router();

router.get('/', getAllServiceUsers);
router.post('/register', createServiceUser);
router.put('/:id', updateServiceUser)
router.delete('/:id', deleteServiceUser)

module.exports = router;
