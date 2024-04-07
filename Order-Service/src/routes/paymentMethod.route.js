const express = require('express');
const router = express.Router();

const paymentMethodController = require('../controllers/paymentMethod.controller');

router.route('/')
    .get(paymentMethodController.getAllPaymentMethod)
    .post(paymentMethodController.createPaymentMethod)

router.route('/:id')
    .get(paymentMethodController.getIdPaymentMethod)
    .delete(paymentMethodController.deletePaymentMethod)

module.exports = router;