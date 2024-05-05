// const { DataTypes } = require("sequelize");
// const sq = require("../config/db");

// const PaymentMethod = sq.define("paymentmethod", {
//   payment_method_id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   payment_method_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   is_deleted: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
// });

// // No need for the async function here, use regular function syntax
// function sync() {
//   PaymentMethod.sync()
//     .then(() => {
//       console.log("PaymentMethod Model synced");
//     })
//     .catch((error) => {
//       console.error("Error syncing models:", error);
//     });
//   sq.sync()
//     .then(() => {
//       console.log("Table PaymentMethod created successfully");
//     })
//     .catch((error) => {
//       console.error("Error creating table:", error);
//     });
// }

// sync(); // Call the sync function

// module.exports = PaymentMethod;
