// app.js

const { orderList, createList } = require('../src/order/order.service.js');

// Existing handler for getting orders
exports.lambdaHandler = async (event, context) => {
  try {
    const startTime = Date.now();
    const result = await orderList();
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

// New handler for creating orders
exports.createHandler = async (event, context) => {
  try {
    const startTime = Date.now();

    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Request body is required'
        })
      };
    }

    let orderData;
    try {
      orderData = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Invalid JSON in request body',
          error: parseError.message
        })
      };
    }

    const result = await createList(orderData);
    const endTime = Date.now();
    console.log(`Execution time: ${endTime - startTime} ms`);

    return {
      statusCode: result.statusCode,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: result.message,
        data: result.data
      })
    };
  } catch (error) {
    console.error('Create handler error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error.message
      })
    };
  }
};
