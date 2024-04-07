const { DataTypes } = require("sequelize");
const sq = require("../config/db");

const Cat = sq.define("cat", {
  cat_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cat_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// No need for the async function here, use regular function syntax
function sync() {
  Cat.sync()
    .then(() => {
      console.log("cat Model synced");
    })
    .catch((error) => {
      console.error("Error syncing models:", error);
    });
  sq.sync()
    .then(() => {
      console.log("Table cat created successfully");
    })
    .catch((error) => {
      console.error("Error creating table:", error);
    });
}

sync(); // Call the sync function

module.exports = Cat;
