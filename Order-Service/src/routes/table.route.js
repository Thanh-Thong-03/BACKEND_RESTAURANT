const express = require('express');
const router = express.Router();

const tableController = require('../controllers/table.controller');

router.route('/')
    .get(tableController.getAllTable)
    .post(tableController.createTable)

router.get('/byname', tableController.getNameTable)

router.route('/:id')
    .get(tableController.getIdTable)
    .delete(tableController.deleteTable)

router.get('/getTablesByArea/:id', tableController.getTablesByArea)
router.put('/updateToUnPaid/:id', tableController.updateToUnPaid)

module.exports = router;