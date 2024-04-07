const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");

const userService = {
  async createUser(user) {
    const newUser = await User.create(user, {include: Role});
    return newUser;
  },

  async getAllUser() {
    const users = await User.findAll({
      where: { is_deleted: false },
      include: Role,
    });
    return users;
  },

  async updateUser(userId, updateUserData) {
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      throw new Error("Người dùng không tồn tại");
    } else {
      await userToUpdate.update(updateUserData);
      return userToUpdate;
    }
  },

  async getUserId(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async deleteUser(userId) {
    await User.update({ is_deleted: true }, { where: { user_id: userId } });
  },

  async getNameUser(nameUser) {
    try {
      const users = await User.findAll({
        where: {
          user_name: {
            [Op.like]: `%${nameUser}%`,
          },
          is_deleted: false,
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  },

  // async register(User) {
  //   try {
  //     const salt = await bcrypt.genSalt(10);
  //     const hased = await bcrypt.hash(User.password, salt);

  //     const newUser = await User.
  //   }
  // }

  // async login(email, password){
  //   const a = await User.find
  // }

  async login(user) {
    const existeUser = await User.findOne({ where: { user_email: user.email } });

    if (!existeUser) {
        throw new Error("Email không tồn tại");
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await User.findOne({ where: { user_password: user.password } });

    if (!isPasswordValid) {
        throw new Error("Mật khẩu không đúng");
    }
    return existeUser;
}
};

module.exports = userService;
