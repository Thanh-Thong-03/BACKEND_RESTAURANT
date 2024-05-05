const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

let refreshTokens = [];
const authController = {
   generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.user_id,
        role: user.role.role_name,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "2d",
      }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.user_id,
        role: user.role.role_name,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "365d",
      }
    );
  },

  async login(req, res) {
    try {
      const user = req.body;
      console.log(user);
      const authUser = await userService.login(user);
      console.log(authUser);
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
        const {user_password, ...others} = authUser.dataValues;
        return res.status(200).json({...others, accessToken});
      } else {
        return res.status(400).json({ message: "Dang nhap that bai" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error instanceof Error ? error.message : error });
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken)
    if (!refreshToken) return res.status(401).json("You are not authencated")
    if (!refreshTokens.includes(refreshToken)) {
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

  logout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
    res.status(200).json('Logged out successfully');
  }
};

module.exports = authController;
