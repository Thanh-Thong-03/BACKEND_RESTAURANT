const express = require('express');
const router = express.Router();
const ImageUploadMiddleware  = require('../middlewares/image.js')

const dishController = require('../controllers/dish.controller');
// const catRouter = require('./cat.route')

const imgMiddleware = new ImageUploadMiddleware();

router.route('/')
    .get(dishController.getAllDishes)
    .post(imgMiddleware.uploadImage('dish_img', 1), dishController.createDish)

router.get('/byName', dishController.getNameDish)

router.get('/getAll', dishController.getAll)

router.route('/:id')
    .put(dishController.updateDish)
    .get(dishController.getIdDish)
    .delete(dishController.deleteDish)

router.put('/:id/updateImg', imgMiddleware.uploadImage('dish_img', 1), dishController.updateImg)

router.put('/HetMon/:id', dishController.HetMon)
router.put('/ConMon/:id', dishController.ConMon)


// router.use('/cat', catRouter);


module.exports = router;