const express = require('express');
const auth = require('../Utilities/auth'); 
const router = express.Router();
const userController = require('../Controllers/userController');

// Auth routes
router.post('/', userController.createUser);    // Register
router.post('/login', userController.login);     // Login



// // Admin routes (optional if you want admins)
// router.get('/', auth.authMW, auth.adminMW, userController.getUsers);  // Get all users (admin only)
//router.delete('/:id', auth.authMW, auth.adminMW, userController.deleteUser); // Delete user by ID (admin only)

module.exports = router;
