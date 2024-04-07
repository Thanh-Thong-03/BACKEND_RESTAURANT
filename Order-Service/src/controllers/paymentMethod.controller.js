const paymentMethodService = require("../services/paymentMethod.service");

const paymentMethodController = {
  async getAllPaymentMethod(req, res, next) {
    try {
      const PaymentMethods = await paymentMethodService.getAllPaymentMethods();
      return res.status(200).json(PaymentMethods);
    } catch (error) {
      next(error);
    }
  },
  async createPaymentMethod(req, res, next) {
    const paymentMethod = req.body;
    try {
      const newPaymentMethod = await paymentMethodService.createPaymentMethod(paymentMethod);
      return res.status(200).json(newPaymentMethod);
    } catch (error) {
      next(error);
    }
  },

  async getIdPaymentMethod(req, res, next) {
    const paymentMethodId = req.params.id;
    try {
      const PaymentMethod = await paymentMethodService.getPaymentMethodId(paymentMethodId);
      if (PaymentMethod) {
        return res.status(200).json(PaymentMethod)
      } else {
        return res.status(200).json({ message: "PaymentMethod is not found"});
      }
    } catch (error) {
      next(error);
    }
  },

  async deletePaymentMethod(req, res, next) {
    const PaymentMethodId = req.params.id;
    try {
      await paymentMethodService.deletePaymentMethod(PaymentMethodId);
      return res.status(200).json({ message: "PaymentMethod is deleted" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = paymentMethodController;
