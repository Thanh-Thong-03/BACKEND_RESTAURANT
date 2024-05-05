const Bill = require("../models/bill.model");
const Table = require("../models/table.model");
const Area = require("../models/area.model");

const billService = {
  async getAllBill() {
    const Bills = await Bill.findAll();
    return Bills;
  },

  async getAllUnCompleted() {
    const bills = await Bill.findAll({
      where: { bill_status_completed: "Chưa Hoàn Thành" },
      include: [
        {
          model: Table,
          include: Area, // Include model Area trong model Table
        },
      ],
    });
    console.log(bills);
    return bills;
  },

  async createBill(bill) {
    console.log(bill);
    const newBill = await Bill.create(bill);
    return newBill;
  },

  async updateBill(billId, updateBillData) {
    const BillToUpdate = await Bill.findByPk(billId);

    if (!BillToUpdate) {
      throw new Error("Bill không tồn tại");
    } else {
      await BillToUpdate.update(updateBillData);
      return BillToUpdate;
    }
  },

  async getBillId(billId) {
    const bill = await Bill.findByPk(billId);
    return bill;
  },

  async updateBillPrice(billId, price) {
    await Bill.update({ bill_price: price }, { where: { bill_id: billId } });
  },
};

module.exports = billService;
