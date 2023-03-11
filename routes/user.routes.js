const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const jwtAuth = require('../middlewares/jwtAuth')
const checkRole = require('../middlewares/checkRole')

// Create a new user
router.post('/users', userController.create);

// Retrieve all users
router.get('/users', jwtAuth, checkRole(['people in need', 'food provider']), userController.find);

// Retrieve a single user by ID
router.get('/users/:id', jwtAuth, checkRole(['people in need', 'food provider']), userController.findById);

// Update a user by ID
router.put('/users/:id', jwtAuth, checkRole(['people in need', 'food provider']), userController.updateById);

// Delete a user by ID
router.delete('/users/:id', jwtAuth, checkRole(['people in need', 'food provider']), userController.deleteById);

module.exports = router;
