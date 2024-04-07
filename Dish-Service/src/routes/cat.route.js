const express = require('express');
const router = express.Router();

const catController = require('../controllers/cat.controller');

router.route('/')
    .get(catController.getAllCat)
    .post(catController.createCat)

router.route('/:id')
    .put(catController.updateCat)
    .get(catController.getIdCat)
    .delete(catController.deleteCat)

module.exports = router;