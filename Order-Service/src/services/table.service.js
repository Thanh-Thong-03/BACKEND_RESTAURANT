const Table = require('../models/table.model')
const { Op } = require('sequelize');

const tableService = {
    async getAllTables(){
        const tables = await Table.findAll({where: {is_deleted: false}});
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

    async getTableId(tableId) {
        const table = await Table.findByPk(tableId);
        return table;
    },

    async deleteTable(tableId) {
        await Table.update(
            { is_deleted: true },
            { where: { table_id: tableId } }
        );
    }
}

module.exports = tableService;