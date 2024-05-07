const orderService = require('../services/order.service')
const rabbitmq = require('../services/rabbitmq.dish');


const orderController = {
    async createOrder(req, res,) {
        const billId = req.body.bill_id;
        const items = req.body.items;
        try {
            const newOrder = await orderService.createOrder(billId, items);
            return res.status(200).json(newOrder);
        } catch (error) {
            console.log(error);
        }
    },

    async add_to_order(req, res){
        const newItem = req.body;
        try {
            const orderItem = await orderService.add_to_order(newItem)
            return res.status(200).json(orderItem);
        } catch (error) {
            console.log(error);
        }
    }, 

    async getAllOrderByBillId(req, res){
        try {
            const billId = req.params.id;
            // const billId = await rabbitmq.receiveMessage('queue1'); // Nhận dữ liệu từ hàng đợi
            console.log(billId);
            const orderItems = await orderService.getAllOrderByBillId(billId);
            // await rabbitmq.sendMessage('queue2', orderItems)
            console.log(orderItems)
            return res.status(200).json(orderItems);
          } catch (error) {
            console.log(error);
          }
    }
}

module.exports = orderController;