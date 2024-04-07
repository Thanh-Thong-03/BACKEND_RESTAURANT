const express = require('express');
const router = express.Router();
const middlewareController = require("../controllers/middleware.controller")

const roleRouter = require('./role.route')

const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

router.route('/')
    .get(middlewareController.verifyToken,userController.getAllUser)
    .post(userController.createUser)

router.get('/byname', userController.getNameUser)

router.route('/:id')
    .put(userController.updateUser)
    .get(middlewareController.verifyTokenAndAdminAuth,userController.getIdUser)
    .delete(middlewareController.verifyTokenAndAdminAuth, userController.deleteUser)

router.use('/role', roleRouter)

// router.post('/register', userController.register)
router.post('/login', authController.login)
router.post('/refreshToken', authController.refreshToken)

// router.post('/forgotPassword', userController.forgotPassword)

module.exports = router;
