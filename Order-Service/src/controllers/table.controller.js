const tableService = require("../services/table.service");

const tableController = {
  async getAllTable(req, res, next) {
    try {
      const tables = await tableService.getAllTables();
      return res.status(200).json(tables);
    } catch (error) {
      next(error);
    }
  },
  async createTable(req, res, next) {
    const table = req.body;
    try {
      const newTable = await tableService.createTable(table);
      return res.status(200).json(newTable);
    } catch (error) {
      next(error);
    }
  },

  async getIdTable(req, res, next) {
    const tableId = req.params.id;
    try {
      const Table = await tableService.getTableId(tableId);
      if (Table) {
        return res.status(200).json(Table)
      } else {
        return res.status(200).json({ message: "Table is not found"});
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteTable(req, res, next) {
    const TableId = req.params.id;
    try {
      await tableService.deleteTable(TableId);
      return res.status(200).json({ message: "Table is deleted" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = tableController;
