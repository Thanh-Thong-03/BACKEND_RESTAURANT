const express = require('express');
const router = express.Router();

const areaController = require('../controllers/area.controller');

router.route('/')
    .get(areaController.getAllArea)
    .post(areaController.createArea)

router.route('/:id')
    .get(areaController.getIdArea)
    .delete(areaController.deleteArea)

module.exports = router;