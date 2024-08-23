const db = require('../db/d');

const cartSchema = new db.Schema({
  userId: {
    type: db.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: db.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  
  // Calculate total amount and round down to the nearest whole number
  this.totalAmount = Math.floor(
    this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  
  next();
});

const Cart = db.model('Cart', cartSchema);

module.exports = Cart;
