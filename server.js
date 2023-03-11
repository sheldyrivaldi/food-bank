const express = require('express');
const app = express();
const application = require('./app');
const db = require('./config/db');

// Configure middleware
app.use(express.json());
// Use the app.js module
app.use(application);

const PORT = 3000 || process.env.PORT

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Listening on port ${PORT}`)
    }
})