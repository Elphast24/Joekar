const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to serve login page
router.get('/', userController.loginPage);
router.post('/login', userController.loginUser);

module.exports = router; // ✅ Corrected export