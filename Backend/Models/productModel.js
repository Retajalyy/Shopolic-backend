const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
  },
  {
    timestamps: true, // Correctly place the timestamps option here
  }
);

const product = mongoose.models.product || mongoose.model('product', productSchema);

module.exports = product;
