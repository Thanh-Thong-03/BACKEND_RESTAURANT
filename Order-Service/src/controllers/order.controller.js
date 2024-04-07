const orderService = require("../services/order.service");

const orderController = {
  async getAllOrder(req, res, next) {
    try {
      const orders = await orderService.getAllOrder();
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },
  async createOrder(req, res, next) {
    const order = req.body;
    try {
      const newOrder = await orderService.createOrder(order);
      return res.status(200).json(newOrder);
    } catch (error) {
      next(error);
    }
  },

  async updateOrder(req, res, next) {
    const orderId = req.params.id;
    const updateOrderData = req.body;
    try {
      const updateOrder = await orderService.updateOrder(
        orderId,
        updateOrderData
      );
      return res.status(200).json(updateOrder);
    } catch (error) {
      next(error);
    }
  },

  async getIdOrder(req, res, next) {
    const orderId = req.params.id;
    try {
      const order = await orderService.getOrderId(orderId);
      if (order) {
        return res.status(200).json(order);
      } else {
        return res.status(400).json({ message: "Order not found" });
      }
    } catch (error) {
      next(error);
    }
  },
  
};

module.exports = orderController;
