const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');
// const imgMiddleware = require('./src/middlewares/image.js')
app.use(cors({
  origin: ['http://localhost:10000', 'http://localhost:9000'],
  credentials: true,
  headers: ['Content-Type', 'token'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}))
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

const userRouter = require('./src/routes/user.route.js');

app.use('/user', userRouter)

// app.post('/upload', imgMiddleware.getImagePath, (req, res) => {
//   return res.send();
// })

app.use((error,req,res,next) => {
  console.log(error);
  return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
  });
});

module.exports = app;