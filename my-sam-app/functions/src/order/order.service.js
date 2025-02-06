const OrderModel = require('../model/order.model.js');

const orderService = {
  // Method to get all orders with recType 'ORDER'
  async orderList() {
    try {
      // Query DynamoDB using Dynamoose, filtering by recType='ORDER'
      const orders = await OrderModel.query('recType').eq('ORDER').exec();
      return {
        statusCode: 200,
        data: orders,          // Array of order objects
        count: orders.length,  // Total number of orders
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

  // Method to get a single order by its ID
  async getOrderById(orderId) {
    try {
      // Get specific order using its ID
      const order = await OrderModel.get({ id: orderId });

      // If order not found, return 404
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

  // Method to get orders by amount
  async getOrdersByAmount(amount) {
    try {
      // Query orders with matching amount
      // Number() ensures amount is converted to numeric type
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

  // Method to get orders by recType
  async getOrdersByRecType(recType) {
    try {
      // Query orders with matching recType
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
  },
  async createList(orderData) {
    try {
      // Validate required fields
      if (!orderData.id || !orderData.amount) {
        return {
          statusCode: 400,
          message: "Missing required fields: id and amount are required"
        };
      }

      // Check if order with same ID already exists
      const existingOrder = await OrderModel.get({ id: orderData.id });
      if (existingOrder) {
        return {
          statusCode: 409,
          message: "Order with this ID already exists"
        };
      }

      // Create new order
      const newOrder = new OrderModel({
        id: orderData.id,
        amount: Number(orderData.amount),
        recType: orderData.recType || "ORDER",
        isActive: orderData.isActive !== undefined ? orderData.isActive : true,
        createdAt: new Date()
      });

      // Save the order to DynamoDB
      const savedOrder = await newOrder.save();

      return {
        statusCode: 201,
        data: savedOrder,
        message: "Order created successfully"
      };
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        statusCode: 500,
        message: "Error creating order",
        error: error.message
      };
    }
  }
};

module.exports = orderService;
