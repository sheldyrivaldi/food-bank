const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: { 
    type: String,
    enum: ['people in need', 'food provider'],
    default: 'food provider' 
  }
});

// Compiling User schema into a model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
