const { DataTypes } = require("sequelize");
const sq = require("../config/db");

const Area = sq.define("area", {
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  area_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// No need for the async function here, use regular function syntax
function sync() {
  Area.sync()
    .then(() => {
      console.log("Area Model synced");
    })
    .catch((error) => {
      console.error("Error syncing models:", error);
    });
  sq.sync()
    .then(() => {
      console.log("Table Area created successfully");
    })
    .catch((error) => {
      console.error("Error creating table:", error);
    });
}

sync(); // Call the sync function

module.exports = Area;
