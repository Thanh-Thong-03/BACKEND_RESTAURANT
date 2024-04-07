const Payment = require('../models/payment.model')
const { Op } = require('sequelize');

const paymentService = {
    async getAllPayments(){
        const payments = await Payment.findAll({where: {is_deleted: false}});
        return payments;
    },
    async createPayment(payment) {
        const newPayment = await Payment.create(payment);
        return newPayment;
    },

    // async findpaymentByName(name) {
    //     const paymentes = await payment.find({ payment_name: name });
    //     return paymentes;
    // },

    async getPaymentId(paymentId) {
        const payment = await Payment.findByPk(paymentId);
        return payment;
    },

    async deletePayment(paymentId) {
        await Payment.update(
            { is_deleted: true },
            { where: { payment_id: paymentId } }
        );
    }
}

module.exports = paymentService;