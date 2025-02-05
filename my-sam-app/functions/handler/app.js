// app.mjs

const { orderList } = require('../src/order/order.service.js')

exports.lambdaHandler = async (event, context) => {
  try {
    const startTime = Date.now();
    // Fetch order data using the orderList function
    const data = await orderList();
    const endTime = Date.now();
    console.log(`Execution time: ${endTime - startTime} ms`);
    return data;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
    };

    return response;
  }
};
