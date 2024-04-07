const express = require('express');
const cors = require('cors');
// Database
require('./src/config/db.js')

const app = express();

app.use(cors({
    origin: 'http://localhost:10000'
  }))

// // Middleware for logging request URL
// app.use((req, res, next) => {
//     console.log('Request URL:', req.originalUrl);
//     next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const dishRouter = require('./src/routes/dish.route');

app.use('/dish', dishRouter);


module.exports = app;



