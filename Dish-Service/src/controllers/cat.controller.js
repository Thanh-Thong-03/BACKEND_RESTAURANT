const catService = require("../services/cat.service");

const catController = {
  async createCat(req, res, next) {
    const cat = req.body;
    try {
      const newCat = await catService.createCat(cat);
      return res.status(200).json(newCat);
    } catch (error) {
      next(error);
    }
  },
  
  async getAllCat(req, res, next) {
    try {
      const cats = await catService.getAllCats();
      return res.status(200).json(cats);
    } catch (error) {
      next(error);
    }
  },

  async updateCat(req, res, next) {
    const catId = req.params.id;
    const updateCatData = req.body;
    try {
      const updateCat = await catService.updateCat(catId, updateCatData);
      return res.status(200).json(updateCat);
    } catch (error) {
      next(error);
    }
  },

  async getIdCat(req, res, next) {
    const catId = req.params.id;
    try {
      const cat = await catService.getCatId(catId);
      if (cat) {
        return res.status(200).json(cat)
      } else {
        return res.status(200).json({ message: "cat is not found"});
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteCat(req, res, next) {
    const catId = req.params.id;
    try {
      await catService.deleteCat(catId);
      return res.status(200).json({ message: "cat is deleted" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = catController;
