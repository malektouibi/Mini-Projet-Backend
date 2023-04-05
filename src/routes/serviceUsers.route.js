const express = require('express');
const { createServiceUser, getAllServiceUsers } = require('../controllers/serviceUser.controller');
const router = express.Router();

router.get('/', getAllServiceUsers)
router.post('/register', createServiceUser);

module.exports = router;
