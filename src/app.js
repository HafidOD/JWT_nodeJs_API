const express = require('express');
const app = express();

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Routes
app.use(require('./routes/web'));

module.exports = app;