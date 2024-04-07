const roleService = require("../services/role.service");

const roleController = {
  async getAllRoles(req, res, next) {
    try {
      const roles = await roleService.getAllRoles();
      return res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  },
  async createRole(req, res, next) {
    const role = req.body;
    try {
      const newRole = await roleService.createRole(role);
      return res.status(200).json(newRole);
    } catch (error) {
      next(error);
    }
  },

  async updateRole(req, res, next) {
    const roleId = req.params.id;
    const updateRoleData = req.body;
    try {
      const updateRole = await roleService.updateRole(roleId, updateRoleData);
      return res.status(200).json(updateRole);
    } catch (error) {
      next(error);
    }
  },

  async getIdRole(req, res, next) {
    const roleId = req.params.id;
    try {
      const role = await roleService.getIdRole(roleId);
      if (role) {
        return res.status(200).json(role);
      } else {
        return res.status(400).json({ message: "role not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  // async getNameRole(req, res, next) {
  //   const nameRole = req.query.role_name;

  //   try {
  //     const roles = await roleService.getNameRole(nameRole);
  //     if (roles.length > 0) {
  //       return res.status(200).json(roles);
  //     } else {
  //       return res.status(404).json({ message: "Name role not found" });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  async deleteRole(req, res, next) {
    const roleId = req.params.id;
    try {
      await roleService.deleteRole(roleId);
      return res.status(200).json({ message: "role is deleted" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = roleController;
