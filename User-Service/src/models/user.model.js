const { DataTypes } = require("sequelize");
const Role = require("./role.model");
const sq = require("../config/db");

const User = sq.define("user", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_sex: {
    type: DataTypes.ENUM('Nam', 'Nữ'),    
    allowNull: true,
  },
  user_birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "roles",
      key: "role_id",
    },
  },
});

User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

function sync() {
  User.sync()
    .then(() => {
      console.log("User Model synced");
    })
    .catch((error) => {
      console.error("Error syncing models:", error);
    });
  sq.sync()
    .then(() => {
      console.log("Table User created successfully");
    })
    .catch((error) => {
      console.error("Error creating table:", error);
    });
}

sync(); // Call the sync function

module.exports = User;
