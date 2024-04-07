const areaService = require("../services/area.service");

const areaController = {
  async getAllArea(req, res, next) {
    try {
      const areas = await areaService.getAllAreas();
      return res.status(200).json(areas);
    } catch (error) {
      next(error);
    }
  },
  async createArea(req, res, next) {
    const area = req.body;
    try {
      const newArea = await areaService.createArea(area);
      return res.status(200).json(newArea);
    } catch (error) {
      next(error);
    }
  },

  async getIdArea(req, res, next) {
    const areaId = req.params.id;
    try {
      const area = await areaService.getAreaId(areaId);
      if (area) {
        return res.status(200).json(area)
      } else {
        return res.status(200).json({ message: "area is not found"});
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteArea(req, res, next) {
    const areaId = req.params.id;
    try {
      await areaService.deleteArea(areaId);
      return res.status(200).json({ message: "area is deleted" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = areaController;
