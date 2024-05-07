const {DataTypes} = require('sequelize');
const sq = require('../config/db');
const Area = require('./area.model');

const Table = sq.define("table", {
    table_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    table_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    table_status: {
      type: DataTypes.ENUM('Trống', 'Đang Phục Vụ'),
      defaultValue: 'Trống'
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'areas',
            key: 'area_id',
        }   
    }
});

Table.belongsTo(Area, {foreignKey: 'area_id'});
Area.hasMany(Table, {foreignKey: 'area_id'});

// No need for the async function here, use regular function syntax
function sync() {
    Table.sync()
      .then(() => {
        console.log("Table Model synced");
      })
      .catch((error) => {
        console.error("Error syncing models:", error);
      });
    sq.sync()
      .then(() => {
        console.log("Table Table created successfully");
      })
      .catch((error) => {
        console.error("Error creating table:", error);
      });
  }
  
  sync(); // Call the sync function

module.exports = Table;

