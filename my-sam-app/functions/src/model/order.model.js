const dynamoose = require('dynamoose');


const orderSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  amount: Number,
  recType: {
    type: String,
    default: "ORDER",
    index: {
      global: true,
      name: "recType-id-index"
    }
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  isActive: {
    type: Boolean,
    default: true
  }
});


const OrderModel = dynamoose.model('Orders', orderSchema);
module.exports = OrderModel;