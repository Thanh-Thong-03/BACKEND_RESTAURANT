const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:10000', 'http://localhost:9000'],
  credentials: true,
  headers: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}))
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// app.use('/order', async (req, res) => {

//     const DishData = await axios.get('http://localhost:3001/dish')
//     return res.send('Message from oder service: ' + DishData.data)
// })

const billRouter = require('./src/routes/bill.route')
const tableRouter = require('./src/routes/table.route')
const areaRouter = require('./src/routes/area.route')

app.use('/bill', billRouter)
app.use('/table', tableRouter)
app.use('/area', areaRouter)

app.use((error,req,res,next) => {
    console.log(error);
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
  });

module.exports = app;


