const { DataTypes } = require("sequelize");
const sq = require("../config/db");
const Cat = require("./cat.model");

const Dish = sq.define("dish", {
  dish_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dish_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dish_img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dish_price: {
    type: DataTypes.DECIMAL(10,0),
    allowNull: false,
  },
  dish_status: { 
    type: DataTypes.ENUM('Còn Món', 'Hết Món'),
    defaultValue: 'Còn Món',
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  cat_id: {
    type: DataTypes.INTEGER, // Kiểu dữ liệu của cat_id là INTEGER
    allowNull: false, // Không được NULL
    references: {
      model: 'cats', // Tham chiếu đến bảng 'cats'
      key: 'cat_id' // Tham chiếu đến cột 'cat_id' trong bảng 'cats'
    }
  }
});

Dish.belongsTo(Cat, { foreignKey: 'cat_id' });
Cat.hasMany(Dish, { foreignKey: 'cat_id' });

// No need for the async function here, use regular function syntax
function sync() {
  Dish.sync()
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

module.exports = Dish;
