const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorizeUser = require('../middleware/authorizeUser');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.put('/profile', authorizeUser, userController.updateProfile);
router.get('/profile/:id', userController.getUserProfile);

module.exports = router;