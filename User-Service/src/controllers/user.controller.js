const userService = require("../services/user.service");
const ImageUploadMiddleware = require("../middlewares/image.js");
const imgMiddleware = new ImageUploadMiddleware();

const userController = {
  async createUser(req, res) {
    const dataUser = req.body;
    dataUser.user_avatar = imgMiddleware.getImagePath(req);
    try {
      const newUser = await userService.createUser(dataUser);
      console.log(newUser);
      return res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllUser(req, res) {
    try {
      const users = await userService.getAllUser();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res) {
    const userId = req.params.id;
    const updateUserData = req.body;
    console.log(userId, updateUserData);
    try {
      const upDateUser = await userService.updateUser(userId, updateUserData);
      return res.status(200).json(upDateUser);
    } catch (error) {
      console.log(error);
    }
  },

  async getIdUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await userService.getUserId(userId);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ message: "user not found" });
      }
    } catch (error) {
      console.log(error);
    }
  },

  async deleteUser(req, res) {
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

  async getNameUser(req, res) {
    const nameUser = req.query.ten;
    console.log(nameUser);
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

  async editImg(req, res) {
    const id = req.params.id;
    const urlImg = imgMiddleware.getImagePath(req);
    try {
      const user = await userService.editImg(id, urlImg);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ mesage: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  async checkEmail(req, res) {
    const email = req.body.email;
    try {
      const existedemail = await userService.checkEmail(email);
      console.log(existedemail)
      if (!existedemail) {
        return res.status(200).json({ mesage: "Email chưa tồn tại" });
      } else {
        return res.status(200).json({ mesage: "Email đã tồn tại" });
      }
    } catch (error) {
      res.status(200).json({ mesage: "Email chưa tồn tại" });
      console.log(error);
    }
  },

  async register(req, res) {
    const user = req.body;
    try {
      const existeUser = await userService.register(user)
      console.log(existeUser)
      return res.status(200).json(existeUser);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
