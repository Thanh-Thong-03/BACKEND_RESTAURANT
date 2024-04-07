const { DataTypes } = require("sequelize");
const sq = require("../config/db");
const Payment = require("./payment.model")
const Table = require("./table.model")

const Order = sq.define("order", {
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  order_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  payment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    reference: {
      model: "payments",
      key: "payment_id",
    }
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
    reference: {
      model: "tables",
      key: "table_id",
    }
  }
});

Order.belongsTo(Payment, {foreignKey: "payment_id"});
Payment.hasMany(Order, {foreignKey: "payment_id"});

Order.belongsTo(Table, {foreign: "table_id"});
Table.hasMany(Order, {foreignKey: "table_id"});

// No need for the async function here, use regular function syntax
function sync() {
  Order.sync()
    .then(() => {
      console.log("order Model synced");
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
