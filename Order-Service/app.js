const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// app.use('/order', async (req, res) => {

//     const DishData = await axios.get('http://localhost:3001/dish')
//     return res.send('Message from oder service: ' + DishData.data)
// })

const orderRouter = require('./src/routes/order.route')

app.use('/order', orderRouter)

app.use((error,req,res,next) => {
    console.log(error);
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
  });

module.exports = app;


