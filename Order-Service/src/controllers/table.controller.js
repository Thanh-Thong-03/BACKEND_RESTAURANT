const tableService = require("../services/table.service");

const tableController = {
  async getAllTable(req, res) {
    try {
      const tables = await tableService.getAllTables();
      return res.status(200).json(tables);
    } catch (error) {
      console.error(error);
    }
  },

  async createTable(req, res) {
    const table = req.body;
    try {
      const newTable = await tableService.createTable(table);
      return res.status(200).json(newTable);
    } catch (error) {
      console.error(error);  
    }
  },

  async getTableById(req, res) {
    const tableId = req.params.id;
    try {
      const Table = await tableService.getTableById(tableId);
      console.log(Table)
      if (Table) {
        return res.status(200).json(Table)
      } else {
        return res.status(200).json({ message: "Table is not found"});
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getNameTable(req, res) {
    const nameTable = req.query.ten;
    console.log(nameTable);
    try{
        const tables = await tableService.getNameTable(nameTable)
        if(tables){
            return res.status(200).json(tables)
        } else {
            return res.status(404).json({message: 'Name table not found'})
        }
    } catch(error) {
      console.log(error);
    }
  },

  async deleteTable(req, res) {
    const TableId = req.params.id;
    try {
      await tableService.deleteTable(TableId);
      return res.status(200).json({ message: "Table is deleted" });
    } catch (error) {
      console.log(error);
    }
  },

  async getTablesByArea(req,res) {
    const AreaId = req.params.id;
    try {
      const tables = await tableService.getTablesByArea(AreaId);
      return res.status(200).json(tables);
    } catch(error) {
      console.log(error);
    }
  },

  async updateTableStatus(req, res) {
    const tableId = req.params.id;
    const updateTableData = req.body;
    try {
      await tableService.updateTableStatus(tableId, updateTableData)
    } catch(error) {
      console.log(error);
    }
  }
};

module.exports = tableController;
