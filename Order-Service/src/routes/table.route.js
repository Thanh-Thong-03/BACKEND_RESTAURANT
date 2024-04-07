const express = require('express');
const router = express.Router();

const tableController = require('../controllers/table.controller');

router.route('/')
    .get(tableController.getAllTable)
    .post(tableController.createTable)

router.route('/:id')
    .get(tableController.getIdTable)
    .delete(tableController.deleteTable)

module.exports = router;