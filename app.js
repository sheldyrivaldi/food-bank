const express = require('express');
const app = express();
const loginRoute = require('./routes/login.routes');
const userRoutes = require('./routes/user.routes');

// Middleware to parse request body
app.use(express.json());

// Routes
app.use('/api', loginRoute);
app.use('/api', userRoutes);

module.exports = app;
