const dishService = require("../services/dish.service");
const ImageUploadMiddleware = require("../middlewares/image")
const imgMiddleware = new ImageUploadMiddleware();

const dishController = {
  async createDish(req, res, next) {
    const dish = req.body;
    dish.dish_img = imgMiddleware.getImagePath(req);
    console.log(dish)
    try {
      const newDish = await dishService.createDish(dish);
      return res.status(200).json(newDish);
    } catch (error) {
      next(error);
    }
  },

  async getAllDishes(req, res) {
    try {
      const dishes = await dishService.getAllDishes();
      return res.status(200).json(dishes);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res) {
    try {
      const dishes = await dishService.getAll();
      return res.status(200).json(dishes);
    } catch (error) {
      next(error);
    }
  },

  async updateDish(req, res) {
    const dishId = req.params.id;
    const updateDishData = req.body;
    console.log(dishId, updateDishData)
    try {
      const updateDish = await dishService.updateDish(dishId, updateDishData);
      return res.status(200).json(updateDish);
    } catch (err) {
      console.log(err);
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
      console.log(error);
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
      console.log(error);
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
  },

  async updateImg(req, res) {
    const id = req.params.id
    const urlImg = await imgMiddleware.getImagePath(req)
    try {
      const dish = await dishService.updateImg(id, urlImg)
      if(dish){
        return res.status(200).json(dish)
      } else {
        return res.status(404).json({message: 'Dish not found'})
      }
    } catch (error) {
      console.log(error)
    }
  },

  async HetMon(req, res) {
    const dishId = req.params.id;
    console.log(dishId)
    try {
      await dishService.HetMon(dishId);
    } catch (error) {
      console.log(error)
    }
  },

  async ConMon(req, res) {
    const dishId = req.params.id;
    // console.log(dishId)
    try {
      await dishService.ConMon(dishId);
    } catch (error) {
      console.log(error)
    }
  }
};

module.exports = dishController;
