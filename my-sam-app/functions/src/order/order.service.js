const OrderModel = require('../model/order.model.js');

const orderService = {
  // Get all orders
  async orderList() {
    try {
      const orders = await OrderModel.query('recType').eq('ORDER').exec();
      return {
        statusCode: 200,
        data: orders,
        count: orders.length,
        message: "Orders retrieved successfully"
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Error fetching orders",
        error: error.message
      };
    }
  },
  // Get order by ID
  async getOrderById(orderId) {
    try {
      const order = await OrderModel.get({ id: orderId });
      if (!order) {
        return {
          statusCode: 404,
          message: "Order not found"
        };
      }
      return {
        statusCode: 200,
        data: order,
        message: "Order retrieved successfully"
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Error fetching order by ID",
        error: error.message
      };
    }
  },

  // Get orders by amount
  async getOrdersByAmount(amount) {
    try {
      const orders = await OrderModel.query('amount').eq(Number(amount)).exec();
      return {
        statusCode: 200,
        data: orders,
        count: orders.length,
        message: "Orders retrieved successfully"
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Error fetching orders by amount",
        error: error.message
      };
    }
  },

  // Get orders by recType
  async getOrdersByRecType(recType) {
    try {
      const orders = await OrderModel.query('recType').eq(recType).exec();
      return {
        statusCode: 200,
        data: orders,
        count: orders.length,
        message: "Orders retrieved successfully"
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Error fetching orders by recType",
        error: error.message
      };
    }
  }

}

module.exports = OrderModel;
