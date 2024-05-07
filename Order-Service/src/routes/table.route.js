const express = require('express');
const router = express.Router();

const tableController = require('../controllers/table.controller');

router.route('/')
    .get(tableController.getAllTable)
    .post(tableController.createTable)

router.get('/byname', tableController.getNameTable)

router.route('/:id')
    .get(tableController.getTableById)
    .delete(tableController.deleteTable)

router.get('/getTablesByArea/:id', tableController.getTablesByArea)
router.patch('/updateTableStatus/:id', tableController.updateTableStatus)

module.exports = router;