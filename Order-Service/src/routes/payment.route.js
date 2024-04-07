const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment.controller');

router.route('/')
    .get(paymentController.getAllPayment)
    .post(paymentController.createPayment)

router.route('/:id')
    .get(paymentController.getIdPayment)
    .delete(paymentController.deletePayment)

module.exports = router;