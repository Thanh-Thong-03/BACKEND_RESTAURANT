const userService = require("../services/user.service");

const userController = {
  async createUser(req, res, next) {
    const user = req.body;
    try {
      const newUser = await userService.createUser(user);
      console.log(newUser);
      return res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  async getAllUser(req, res, next) {
    try {
      const users = await userService.getAllUser();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    const userId = req.params.id;
    const updateUserData = req.body;
    try {
      const upDateUser = await userService.updateUser(userId, updateUserData);
      return res.status(200).json(upDateUser);
    } catch (e) {
      next(e);
    }
  },

  async getIdUser(req, res, next) {
    const userId = req.params.id;
    try {
      const user = await userService.getUserId(userId);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ message: "user not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    const userId = req.params.id;
    try {
      const user = await userService.getUserId(userId);
      if (user) {
        await userService.deleteUser(userId);
        return res.status(200).json({ message: "user is deleted" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  async getNameUser(req, res, next) {
    const nameUser = req.query.ten;
    try {
      const user = await userService.getNameUser(nameUser);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "Name user not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  // async register(req, res, next) {
  //   const User = req.body;
  //   try {
  //     const existeUser = await userService.register(User)
  //     if(existeUser){
  //       return res.status(200).json(existeUser);
  //     } else {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  
};

module.exports = userController;
