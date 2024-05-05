const express = require('express')
const router = express.Router();

const orderController = require('../controllers/order.controller');

router.post('/', orderController.createOrder)
router.post('/add-to-order', orderController.add_to_order)
router.get('/:id',orderController.getAllOrderByBillId)


module.exports = router;