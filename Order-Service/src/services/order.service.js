const Order = require('../models/order.model')

const orderService = {
    async getAllOrder(){
        const orders = await Order.findAll();
        return orders;
    },
    async createOrder(order) {
        const newOrder = await Order.create(order);
        return newOrder;
    },

    async updateOrder(orderId, updateOrderData){
        const orderToUpdate = await Order.findByPk(orderId)

        if(!orderToUpdate){
            throw new Error('Order không tồn tại') 
        } else{
            await orderToUpdate.update(updateOrderData)
            return orderToUpdate;
        }
    },

    async getOrderId(orderId){
        const order = await Order.findByPk(orderId);
        return order;
    },

}

module.exports = orderService;