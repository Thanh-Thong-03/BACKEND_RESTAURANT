const Dish = require("../models/dish.model");
const Cat = require("../models/cat.model");
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
    const dishes = await Dish.findAll({
      where: { is_deleted: false },
      include: Cat,
    });
    return dishes;
  },

  async getAll() {
    const dishes = await Dish.findAll({
      where: { is_deleted: false, dish_status: "Còn Món" },
      include: Cat,
    });
    return dishes;
  },

  async updateDish(dishId, updateDishData) {
    const dishToUpdate = await Dish.findByPk(dishId);
    if (!dishToUpdate) {
      throw new Error("Món ăn không tồn tại");
    } else {
      await dishToUpdate.update(updateDishData);
      return dishToUpdate;
    }
  },

  async getDishId(dishId) {
    const dish = await Dish.findByPk(dishId, { include: Cat });
    return dish;
  },

  async getNameDish(nameDish) {
    try {
      const dishes = await Dish.findAll({
        where: {
          is_deleted: false,
          dish_name: {
            [Op.iLike]: `%${nameDish}%`,
          },
        },
        include: Cat,
      });
      return dishes;
    } catch (error) {
      throw error;
    }
  },

  async deleteDish(dishId) {
    await Dish.update({ is_deleted: true }, { where: { dish_id: dishId } });
  },

  async updateImg(id, urlImg) {
    await Dish.update({ dish_img: urlImg }, { where: { dish_id: id } });
  },

  async HetMon(dishId) {
    await Dish.update(
      { dish_status: "Hết Món" },
      { where: { dish_id: dishId } }
    );
  },

  async ConMon(dishId) {
    await Dish.update(
      { dish_status: "Còn Món" },
      { where: { dish_id: dishId } }
    );
  },

  async getDishByCat(catId) {
      const dishes = await Dish.findAll({ where: { cat_id: catId }, include: Cat });
      return dishes;
  },
};

module.exports = dishService;
