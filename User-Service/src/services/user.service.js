const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

const userService = {
  async createUser(dataUser) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(dataUser.user_password, salt)
    dataUser.user_password = hashedPassword
    console.log(dataUser)
    const newUser = await User.create(dataUser, { include: Role });
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
    const user = await User.findByPk(userId, { include: Role });
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
          is_deleted: false,
          user_name: {
            [Op.iLike]: `%${nameUser}%`,
          },
        },
        include: Role,
      });
      console.log(users);
      return users;
    } catch (error) {
      throw error;
    }
  },

  async editImg(id, urlImg) {
    const user = await User.update(
      { user_avatar: urlImg },
      { where: { user_id: id } }
    );
    return user;
  },

  async checkEmail(email) {
    const existedEmail = await User.findOne({ where: { user_email: email } });
    if (existedEmail) {
      return existedEmail;
    } else {
      throw new Error("Email not found");
    }
  },
  async register(user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword  = await bcrypt.hash(user.password, salt);
    const newUser = await User.create({
      user_email: user.email,
      user_password: hashedPassword
    });
    return newUser;
  },

  async login(user) {
    const existeUser = await User.findOne({
      where: { user_email: user.email },
      include: Role
    });

    if (!existeUser) {
      throw new Error("Email không tồn tại");
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(user.password, existeUser.user_password)

    if (!isPasswordValid) {
      throw new Error("Mật khẩu không đúng");
    }
    return existeUser;
  },
};

module.exports = userService;
