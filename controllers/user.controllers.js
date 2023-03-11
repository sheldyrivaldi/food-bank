const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user.models');

// Create a new user
async function create(req, res) {
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user instance using the User model
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response to the client
    res.status(200).json({ message: 'User created' });
  } catch (error) {
    // Handle any errors and send a 500 error response to the client
    res.status(500).json({ message: error.message });
  }
}

// Find all users
async function find(req, res) {
  try {
    // Get all users from the database using the User model
    const users = await User.find();

    // Send the users as a JSON response to the client
    res.status(200).json(users);
  } catch (error) {
    // Handle any errors and send a 500 error response to the client
    res.status(500).json({ message: error.message });
  }
}

// Find a user by their ID
async function findById(req, res) {
  try {
    // Get the user with the specified ID from the database using the User model
    const user = await User.findById(req.params.id);

    // Send the user as a JSON response to the client
    res.status(200).json(user);
  } catch (error) {
    // Handle any errors and send a 500 error response to the client
    res.status(500).json({ message: error.message });
  }
}

// Update a user by their ID
async function updateById(req, res) {
  try {
    // Update the user with the specified ID using the User model
    await User.findByIdAndUpdate(req.params.id, req.body);

    // Send a success response to the client
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    // Handle any errors and send a 500 error response to the client
    res.status(500).json({ message: error.message });
  }
}

// Delete a user by their ID
async function deleteById(req, res) {
  try {
    // Delete the user with the specified ID from the database using the User model
    await User.findByIdAndRemove(req.params.id);

    // Send a success response to the client
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    // Handle any errors and send a 500 error response to the client
    res.status(500).json({ message: error.message });
  }
}

// Export the functions as an object to be used in other parts of the application
module.exports = { create, find, findById, updateById, deleteById };
