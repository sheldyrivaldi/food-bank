const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
require('dotenv').config();

// Login endpoint
router.post('/login', (req, res) => {
    // Get user credentials from request body
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email: email }).then((foundUser) => {
        // Create payload for JSON Web Token
        const payload = {
            id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role
        };

        // Create JSON Web Token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        try {
            // If user is found, compare passwords
            if(foundUser) {
                bcrypt.compare(password, foundUser.password, (err, result) => {
                    // If passwords match, return JSON Web Token
                    if(result === true) {
                        res.status(200).json({
                            message: 'Login successful',
                            token: token
                        });
                    // If passwords don't match, return 401 Unauthorized
                    } else {
                        res.status(401).json({
                            message: 'Login failed'
                        });
                    }
                });
            // If user is not found, return 401 Unauthorized
            } else {
                res.status(401).json({
                    message: 'User not found'
                });
            }
        // Catch any errors and return 500 Internal Server Error
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    });
});

module.exports = router;
