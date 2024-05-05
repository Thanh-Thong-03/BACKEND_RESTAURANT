// const { DataTypes, Sequelize  } = require("sequelize");
// const sq = require("../config/db");
// const PaymentMethod = require("./paymentMethod.model");

// const Payment = sq.define("payment", {
//   payment_id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   payment_time: {
//     type: DataTypes.DATE,
//     defaultValue: Sequelize .literal('CURRENT_TIMESTAMP'),
//   },
//   is_deleted: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
//   payment_method_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: "paymentmethods",
//       key: "payment_method_id",
//     },
//   },
// });

// Payment.belongsTo(PaymentMethod, { reference: "payment_method_id" });
// PaymentMethod.hasMany(Payment, { reference: "payment_method_id" });

// // No need for the async function here, use regular function syntax
// function sync() {
//   Payment.sync()
//     .then(() => {
//       console.log("Payment Model synced");
//     })
//     .catch((error) => {
//       console.error("Error syncing models:", error);
//     });
//   sq.sync()
//     .then(() => {
//       console.log("Table Payment created successfully");
//     })
//     .catch((error) => {
//       console.error("Error creating table:", error);
//     });
// }

// sync(); // Call the sync function

// module.exports = Payment;
