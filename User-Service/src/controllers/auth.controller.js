const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

let refreshTokens = [];
const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.user_id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "30s",
      }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.user_id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "365d",
      }
    );
  },

  async login(req, res, next) {
    try {
      const user = req.body;
      const authUser = await userService.login(user);
      if (authUser) {
        const accessToken = authController.generateAccessToken(authUser);
        const refreshToken = authController.generateRefreshToken(authUser);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        return res.status(200).json({
          message: "Dang nhap thanh cong",
          authUser,
          accessToken,
        });
      } else {
        return res.status(400).json({ message: "Dang nhap that bai" });
      }
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req, res) => {
    const refreshToken = req.cookies && req.cookies.refreshToken;
    console.log(refreshToken)
    if (!refreshToken) return res.status(401).json("You are not authencated 1");
    if(!refreshTokens.includes(refreshToken)){
        return res.status(401).json("RefreshToken is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        return console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },
};

module.exports = authController;
