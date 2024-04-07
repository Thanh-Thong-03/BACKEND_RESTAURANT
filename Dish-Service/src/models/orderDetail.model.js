const { DataTypes } = require("sequelize");
const sq = require("../config/db");
const Dish = require("../models/dish.model")

const OrderDetail = sq.define("orderdetail", {
  
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  dish_id: {
    type: DataTypes.INTEGER, // Kiểu dữ liệu của dish_id là INTEGER
    allowNull: false, // Không được NULL
    references: {
      model: 'dishs', // Tham chiếu đến bảng 'dishs'
      key: 'dish_id' // Tham chiếu đến cột 'dish_id' trong bảng 'cats'
    }
  }
});

Dish.belongsTo(OrderDetail, { foreignKey: 'dish_id' });
OrderDetail.hasMany(Dish, { foreignKey: 'dish_id' });

// No need for the async function here, use regular function syntax
function sync() {
    OrderDetail.sync()
    .then(() => {
      console.log("Dish Model synced");
    })
    .catch((error) => {
      console.error("Error syncing models:", error);
    });
  sq.sync()
    .then(() => {
      console.log("Table Dish created successfully");
    })
    .catch((error) => {
      console.error("Error creating table:", error);
    });
}

sync(); // Call the sync function

module.exports = OrderDetail;
