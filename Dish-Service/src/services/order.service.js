const Order = require("../models/order.model");
const Dish = require("../models/dish.model")

const orderService = {
  async createOrder(billId, items) {
    try {
      const Items = [];
      // Thêm các món ăn vào giỏ hàng mới
      for (const item of items) {
        const newItem = await Order.create({
          bill_id: billId,
          dish_id: item.dish_id,
          quantity: item.quantity,
          note: item.note,
        });
        Items.push(newItem);
      }
      return Items;
    } catch (error) {
      throw new Error("Error adding to order: " + error.message);
    }
  },

  async add_to_order(newItem) {
    try {
      let orderItems = [];
      const existingItemIndex = orderItems.findIndex(
        (item) => item.id === item.id
      );
      if (existingItemIndex !== -1) {
        // Nếu mặt hàng đã tồn tại, tăng số lượng lên
        orderItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Nếu mặt hàng chưa tồn tại, thêm vào giỏ hàng
        cartItems.push(newItem);
      }
      res
        .status(200)
        .json({ message: "Item added to cart successfully", cartItems });
    } catch (error) {
      throw new Error("Error adding to order: " + error.message);
    }
  },

  async getAllOrderByBillId(billId){
    const OrderItems = await Order.findAll({where: {bill_id: billId}, include: Dish});
    return OrderItems;
  }
};

module.exports = orderService;
