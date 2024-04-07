const paymentService = require("../services/payment.service");

const paymentController = {
  async getAllPayment(req, res, next) {
    try {
      const payments = await paymentService.getAllPayments();
      return res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  },
  async createPayment(req, res, next) {
    const payment = req.body;
    try {
      const newPayment = await paymentService.createPayment(payment);
      return res.status(200).json(newPayment);
    } catch (error) {
      next(error);
    }
  },

  async getIdPayment(req, res, next) {
    const paymentId = req.params.id;
    try {
      const payment = await paymentService.getPaymentId(paymentId);
      if (payment) {
        return res.status(200).json(payment)
      } else {
        return res.status(200).json({ message: "payment is not found"});
      }
    } catch (error) {
      next(error);
    }
  },

  async deletePayment(req, res, next) {
    const paymentId = req.params.id;
    try {
      await paymentService.deletePayment(paymentId);
      return res.status(200).json({ message: "payment is deleted" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = paymentController;
