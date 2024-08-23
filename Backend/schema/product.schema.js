// product.schema.js

const db = require("../db/d");

const schema = new db.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
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

schema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const model = db.model('Product', schema);

module.exports = model;
