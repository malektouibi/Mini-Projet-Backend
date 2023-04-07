const express = require('express');
const { getAllServiceUsers, createServiceUser, updateServiceUser, deleteServiceUser } = require('../controllers/serviceUser.controller');
const loginServiceUser = require('../auth/auth');
const router = express.Router();

router.get('/', getAllServiceUsers);
router.post('/login', loginServiceUser);
router.post('/register', createServiceUser);
router.put('/:id', updateServiceUser)
router.delete('/:id', deleteServiceUser)

module.exports = router;
