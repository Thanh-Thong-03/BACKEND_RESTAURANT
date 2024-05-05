const { DataTypes } = require("sequelize");
const sq = require("../config/db");
// const Payment = require("./payment.model")
const Table = require("./table.model")

const Bill = sq.define("bill", {
  bill_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  bill_status_paid: {
    type: DataTypes.ENUM('Chưa Thanh Toán', 'Đã Thanh Toán', 'Đã Hủy'),
    defaultValue: 'Chưa Thanh Toán'
  },
  bill_status_completed: {
    type: DataTypes.ENUM('Chưa Hoàn Thành', 'Đã Hoàn Thành'),
    defaultValue: 'Chưa Hoàn Thành'
  },
  bill_price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  payment_method: {
    type: DataTypes.ENUM('Tiền mặt', 'Chuyển Khoản'),
    defaultValue: 'Tiền mặt'
  },
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    reference: {
      model: "staffs",
      key: "staff_id",
    }
  },
  table_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "tables",
      key: "table_id",
    }
  }
});

Bill.belongsTo(Table, {foreignKey: "table_id"});
Table.hasMany(Bill, {foreignKey: "table_id"});

// No need for the async function here, use regular function syntax
function sync() {
  Bill.sync()
    .then(() => {
      console.log("bill Model synced");
    })
    .catch((error) => {
      console.error("Error syncing models:", error);
    });
  sq.sync()
    .then(() => {
      console.log("Table bill created successfully");
    })
    .catch((error) => {
      console.error("Error creating table:", error);
    });
}

sync(); // Call the sync function

module.exports = Bill;
