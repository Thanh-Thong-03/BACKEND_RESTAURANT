const { DataTypes } = require("sequelize");
const sq = require("../config/db");
const Dish = require("./dish.model"); // Import mô hình dishes (đảm bảo rằng đường dẫn đúng)

// Định nghĩa mô hình dishdetails
const Order = sq.define("order", {
  bill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  dish_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "dishes",
      key: "dish_id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Còn món", "Hết món"),
    allowNull: false,
    defaultValue: "Còn món",
  },
});

Order.belongsTo(Dish, { foreignKey: "dish_id" });
Dish.hasMany(Order, { foreignKey: "dish_id" });

function sync() {
  Order.sync()
    .then(() => {
      console.log("Order Model synced");
    })
    .catch((error) => {
      console.error("Error syncing models:", error);
    });
  sq.sync()
    .then(() => {
      console.log("Table Order created successfully");
    })
    .catch((error) => {
      console.error("Error creating table:", error);
    });
}

sync(); // Call the sync function

module.exports = Order;
