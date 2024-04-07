const dishService = require("../services/dish.service");

const dishController = {
  async createDish(req, res, next) {
    const dish = req.body;
    try {
      const newDish = await dishService.createDish(dish);
      return res.status(200).json(newDish);
    } catch (error) {
      next(error);
    }
  },

  async getAllDishes(req, res, next) {
    try {
      const dishes = await dishService.getAllDishes();
      return res.status(200).json(dishes);
    } catch (error) {
      next(error);
    }
  },

  async updateDish(req, res, next) {
    const dishId = req.params.id;
    const updateDishData = req.body;
    try {
      const updateDish = await dishService.updateDish(dishId, updateDishData);
      return res.status(200).json(updateDish);
    } catch (error) {
      next(error);
    }
  },

  async getIdDish(req, res, next) {
    const dishId = req.params.id;
    try{
        const dish = await dishService.getDishId(dishId);
        if(dish){
            return res.status(200).json(dish);
        } else {
            return res.status(400).json({message: 'Dish not found'});
        }
    } catch(error) {
        next(error);
    }
  },

  async getNameDish(req, res, next) {
    const nameDish = req.query.ten;

    try{
        const dishes = await dishService.getNameDish(nameDish)
        if(dishes){
            return res.status(200).json(dishes)
        } else {
            return res.status(404).json({message: 'Name dish not found'})
        }
    } catch(error) {
        next (error)
    }
  },

  async deleteDish(req, res, next){
    const dishId = req.params.id;
    try {
        await dishService.deleteDish(dishId)
        return res.status(200).json({message: 'Dish is deleted'})
    } catch (error) {
        next(error)
    }
  }
};

module.exports = dishController;
