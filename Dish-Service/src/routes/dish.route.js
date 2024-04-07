const express = require('express');
const router = express.Router();

const dishController = require('../controllers/dish.controller');
const catRouter = require('./cat.route')

router.route('/')
    .get(dishController.getAllDishes)
    .post(dishController.createDish)

router.route('/:id')
    .put(dishController.updateDish)
    .get(dishController.getIdDish)
    .delete(dishController.deleteDish)

router.get('/byName', dishController.getNameDish)


router.use('/cat', catRouter);

module.exports = router;