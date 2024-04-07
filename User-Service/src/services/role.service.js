const Role = require("../models/role.model");
const { Op } = require("sequelize");

const roleService = {
  async createRole(role) {
    const newRole = await Role.create(role);
    return newRole;
  },

  // async findRoleByName(name) {
  //   const Roles = await Role.find({ role_name: name });
  //   return Roles;
  // },

  async getAllRoles() {
    const Roles = await Role.findAll({ where: { is_deleted: false } });
    console.log(Roles);
    return Roles;
  },

  async updateRole(roleId, updateRoleData) {
    const RoleToUpdate = await Role.findByPk(roleId);

    if (!RoleToUpdate) {
      throw new Error("Món ăn không tồn tại");
    } else {
      await RoleToUpdate.update(updateRoleData);
      return RoleToUpdate;
    }
  },

  async getIdRole(roleId) {
    const role = await Role.findByPk(roleId);
    return role;
  },

  // async getNameRole(nameRole) {
  //   try {
  //     const Roles = await Role.findAll({
  //       where: {
  //         is_deleted: false,
  //         role_name: {
  //           [Op.iLike]: `%${nameRole}%`,
  //         },
  //       },
  //     });
  //     return Roles;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  async deleteRole(roleId) {
    await Role.update({ is_deleted: true }, { where: { role_id: roleId } });
  },
};

module.exports = roleService;
