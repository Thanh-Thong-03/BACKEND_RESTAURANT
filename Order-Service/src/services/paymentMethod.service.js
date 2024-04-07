const PaymentMethod = require('../models/paymentMethod.model')
const { Op } = require('sequelize');

const paymentMethodService = {
    async getAllPaymentMethods(){
        const paymentMethods = await PaymentMethod.findAll({where: {is_deleted: false}});
        return paymentMethods;
    },
    async createPaymentMethod(paymentMethod) {
        const newPaymentMethod = await PaymentMethod.create(paymentMethod);
        return newPaymentMethod;
    },

    // async findpaymentMethodByName(name) {
    //     const paymentMethodes = await paymentMethod.find({ paymentMethod_name: name });
    //     return paymentMethodes;
    // },

    async getPaymentMethodId(paymentMethodId) {
        const paymentMethod = await PaymentMethod.findByPk(paymentMethodId);
        return paymentMethod;
    },

    async deletePaymentMethod(paymentMethodId) {
        await PaymentMethod.update(
            { is_deleted: true },
            { where: { payment_method_id: paymentMethodId } }
        );
    }
}

module.exports = paymentMethodService;