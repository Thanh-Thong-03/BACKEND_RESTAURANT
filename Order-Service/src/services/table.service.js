const Table = require('../models/table.model')
const Area = require('../models/area.model')
const { Op } = require('sequelize');

const tableService = {
    async getAllTables(){
        const tables = await Table.findAll({where: {is_deleted: false}, include: Area});
        return tables;
    },
    async createTable(table) {
        const newTable = await Table.create(table);
        return newTable;
    },

    // async findtableByName(name) {
    //     const tablees = await table.find({ table_name: name });
    //     return tablees;
    // },

    async getTableById(tableId) {
        const table = await Table.findByPk(tableId, { include: Area });
        return table;
    },

    async getNameTable(nameTable) {
        try {
          const tables = await Table.findAll({
            where: {
              is_deleted: false,
              table_name: {
                [Op.iLike]: `%${nameTable}%`,
              },
            },
            include: Area,
          });
          return tables;
        } catch (error) {
          throw error;
        }
      },

    async deleteTable(tableId) {
        await Table.update(
            { is_deleted: true },
            { where: { table_id: tableId } }
        );
    },

    async getTablesByArea(AreaId) {
        const tables = await Table.findAll({
            where: { is_deleted: false, area_id: AreaId},
            include: Area
        })
        return tables
    },

    async updateTableStatus(tableId, updateTableData) {
      await Table.update(
        updateTableData,
        { where: { table_id: tableId}}
      )
    }
}

module.exports = tableService;