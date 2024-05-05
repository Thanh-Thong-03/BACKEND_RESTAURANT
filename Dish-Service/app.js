const express = require('express');
const cors = require('cors');
// require('./src/config/db.js')

const app = express();

app.use(cors({
  origin: ['http://localhost:10000', 'http://localhost:9000'],
  credentials: true,
  headers: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}))

// // Middleware for logging request URL
// app.use((req, res, next) => {
//     console.log('Request URL:', req.originalUrl);
//     next();
// });

//phân tích dữ liệu JSON và biến đổi nó thành đối tượng JavaScript, 
//sau đó gắn đối tượng này vào thuộc tính req.body của yêu cầu.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const rabbitmq = require('./src/services/rabbitmq.dish');

// const queueName = 'my_queue';
// const data = {
//   id: 1,
//   name: "Product ABC",
//   price: 29.99,
//   quantity: 10
// };
//
// (async () => {
  // await rabbitmq.sendMessage(queueName, data); // Gửi tin nhắn đến hàng đợi trước
  // const dulieu = await rabbitmq.receiveMessage(queueName); // Nhận dữ liệu từ hàng đợi
  // console.log('Du lieu:', dulieu); // In ra dữ liệu nhận được
// })();

const dishRouter = require('./src/routes/dish.route');
const catRouter = require('./src/routes/cat.route')
const orderRouter = require('./src/routes/order.route')


app.use('/dish', dishRouter);
app.use('/cat', catRouter);
app.use('/order', orderRouter);


module.exports = app;



