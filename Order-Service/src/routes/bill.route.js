const express = require('express');
const router = express.Router();

const billController = require('../controllers/bill.controller.js');
const paymentRouter = require('./payment.route.js');
const paymentMethodRouter = require('./paymentMethod.route.js');

router.route('/')
    .get(billController.getAllBill)
    .post(billController.createBill)

router.get('/getAllUnCompleted', billController.getAllUnCompleted)

router.route('/:id')
    .patch(billController.updateBill)
    .get(billController.getIdBill)

router.use('/payment', paymentRouter);
router.use('/paymentMethod', paymentMethodRouter);


module.exports = router;