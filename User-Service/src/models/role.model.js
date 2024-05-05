const { DataTypes } = require("sequelize");

const sq = require("../config/db");

const Role = sq.define("role", {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role_name: {
    type: DataTypes.STRING,    
    allowNull: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

function sync() {
  Role.sync()
    .then(() => {
      console.log("Role Model synced");
    })
    .catch((error) => {
      console.error("Error syncing models:", error);
    });
  sq.sync()
    .then(() => {
      console.log("Table Role created successfully");
    })
    .catch((error) => {
      console.error("Error creating table:", error);
    });
}

sync(); // Call the sync function

module.exports = Role;
