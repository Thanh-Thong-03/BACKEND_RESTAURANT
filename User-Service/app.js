const express = require('express');
const cors = require('cors')
const app = express();

const cloudinary = require('./src/config/cloudinary.js')

app.use(cors({
  origin: 'http://localhost:10000'
}))
app.use(express.json());
app.use(express.urlencoded({ extended:true }));



const userRouter = require('./src/routes/user.route.js');

app.use('/user', userRouter)

app.use((error,req,res,next) => {
  console.log(error);
  return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
  });
});

module.exports = app;