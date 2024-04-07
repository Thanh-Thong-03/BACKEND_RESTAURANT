const Dish = require("../models/dish.model");
const { Op } = require("sequelize");

const dishService = {
  async createDish(dish) {
    const newDish = await Dish.create(dish);
    return newDish;
  },

  // async findDishByName(name) {
  //   const dishes = await Dish.find({ dish_name: name });
  //   return dishes;
  // },

  async getAllDishes() {
    const dishes = await Dish.findAll({ where: { is_deleted: false } });
    return dishes;
  },

  async updateDish(dishId, updateDishData) {
    const dishToUpdate = await Dish.findByPk(dishId);

    await dishToUpdate.update(updateDishData);
    return dishToUpdate;
  },

  async getDishId(dishId) {
    const dish = await Dish.findByPk(dishId);
    return dish;
  },

  async getNameDish(nameDish) {
    try {
      const dishes = await Dish.findAll({
        where: {
          dish_name: {
            [Op.like]: `%${nameDish}%`,
          },
          is_deleted: false,
        },
      });
      return dishes;
    } catch (error) {
      throw error;
    }
  },

  async deleteDish(dishId) {
    await Dish.update({ is_deleted: true }, { where: { dish_id: dishId } });
  },
};

module.exports = dishService;
