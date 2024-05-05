const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth")
const ImageUploadMiddleware  = require('../middlewares/image.js')

const roleRouter = require('./role.route')
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

const imgMiddleware = new ImageUploadMiddleware();

router.route('/')
    .get(userController.getAllUser)
    .post(authMiddleware.verifyTokenAndAdminAuth, imgMiddleware.uploadImage('user_avatar', 1), userController.createUser)

router.get('/byname', userController.getNameUser)

router.route('/:id')
    .put(userController.updateUser)
    .get(userController.getIdUser)
    .delete(userController.deleteUser)

router.put('/:id/editImg',imgMiddleware.uploadImage('user_avatar', 1), userController.editImg)
router.post('/checkemail', userController.checkEmail)
router.use('/role', roleRouter)

router.post('/register', userController.register)
router.post('/login', authController.login)
router.post('/refresh', authController.requestRefreshToken)
router.post('/logout', authMiddleware.verifyToken, authController.logout)
// router.post('/forgotPassword', userController.forgotPassword)

// router.post('/upload', userController.upload)

module.exports = router;
