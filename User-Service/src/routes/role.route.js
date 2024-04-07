const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role.controller');

router.route('/a')
    .get(roleController.getAllRoles)
    .post(roleController.createRole)

router.route('/:id')
    .put(roleController.updateRole)
    .get(roleController.getIdRole)
    .delete(roleController.deleteRole)

// router.get('/:getRoleByName', roleController.getNameRole)

module.exports = router;