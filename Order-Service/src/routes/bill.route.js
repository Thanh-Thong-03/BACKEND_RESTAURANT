const express = require('express');
const router = express.Router();

const billController = require('../controllers/bill.controller.js');
const paymentRouter = require('./payment.route.js');
const paymentMethodRouter = require('./paymentMethod.route.js');

router.route('/')
    .get(billController.getAllBill)
    .post(billController.createBill)

router.get('/getAllUnCompleted', billController.getAllUnCompleted)
router.get('/getBillByTableId/:id', billController.getBillByTableId)
router.get('/getAllBillsUnPaid', billController.getAllBillsUnPaid)   
router.get('/getBillsPaid', billController.getBillsPaid)

router.route('/:id')
    .patch(billController.updateBill)
    .get(billController.getIdBill)

router.use('/payment', paymentRouter);
router.use('/paymentMethod', paymentMethodRouter);


module.exports = router;