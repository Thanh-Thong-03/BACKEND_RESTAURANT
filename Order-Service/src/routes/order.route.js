const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');
const areaRouter = require('./area.route.js');
const paymentRouter = require('./payment.route.js');
const paymentMethodRouter = require('./paymentMethod.route.js');
const tableRouter = require('./table.route.js');


router.route('/')
    .get(orderController.getAllOrder)
    .post(orderController.createOrder)

router.route('/:id')
    .put(orderController.updateOrder)
    .get(orderController.getIdOrder)

router.use('/area', areaRouter);
router.use('/payment', paymentRouter);
router.use('/paymentMethod', paymentMethodRouter);
router.use('/table', tableRouter);



module.exports = router;