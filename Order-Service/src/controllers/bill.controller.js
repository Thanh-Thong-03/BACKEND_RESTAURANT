const billService = require("../services/bill.service");
const rabbitmq = require("../services/rabbitmq.bill");

const billController = {
  async getAllBill(req, res) {
    try {
      const bills = await billService.getAllBill();
      return res.status(200).json(bills);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllUnCompleted(req, res) {
    try {
      const bills = await billService.getAllUnCompleted();
      for (const bill of bills) {
        console.log(bill.bill_id);
        // await rabbitmq.sendMessage("queue1", bill.bill_id); // Gửi tin nhắn đến hàng đợi trước
        // const dulieu = await rabbitmq.receiveMessage('queue2'); // Nhận dữ liệu từ hàng đợi
        // console.log('Du lieu:', dulieu); // In ra dữ liệu nhận được
      }
      return res.status(200).json(bills);
    } catch (error) {
      console.log(error);
    }
  },

  async createBill(req, res) {
    const bill = req.body;
    try {
      const newBill = await billService.createBill(bill);
      return res.status(200).json(newBill);
    } catch (error) {
      console.log(error);
    }
  },

  async updateBill(req, res) {
    const billId = req.params.id;
    const updateBillData = req.body;
    try {
      const updateBill = await billService.updateBill(billId, updateBillData);
      return res.status(200).json(updateBill);
    } catch (error) {
      console.log(error);
    }
  },

  async getIdBill(req, res) {
    const billId = req.params.id;
    try {
      const bill = await billService.getBillId(billId);
      if (bill) {
        return res.status(200).json(bill);
      } else {
        return res.status(400).json({ message: "bill not found" });
      }
    } catch (error) {
      console.log(error);
    }
  },

  async updateBillPrice(req, res) {
    const billId = req.params.id;
    const price = req.body.bill_price;
    try {
      await billService.updateBillPrice(billId, price);
    } catch (error) {
      console.log(error);
    }
  },

  async getBillByTableId(req, res) {
    try {
      const tableId = req.params.id;
      const bills = await billService.getBillByTableId(tableId);
      return res.status(200).json(bills);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllBillsUnPaid(req, res) {
    try {
      const bills = await billService.getAllBillsUnPaid();
      return res.status(200).json(bills);
    } catch (error) {
      console.log(error);
    }
  },

  async getBillsPaid(req, res) {
    try {
      const bills = await billService.getBillsPaid();
      return res.status(200).json(bills);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = billController;
