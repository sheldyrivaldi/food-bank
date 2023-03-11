const mongoose = require('mongoose');

// Connection URL and database name
const url = 'mongodb://localhost:27017/food-banking';

// Connect to MongoDB
const connection = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.log('Unable to connect to MongoDB:', err);
  });

  module.exports = connection;