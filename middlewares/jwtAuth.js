const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use((req, res, next) => {

        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                res.status(401).json({
                    message: 'Invalid token'
                })
            } else {
                next()
            }
        })
})

module.exports = app