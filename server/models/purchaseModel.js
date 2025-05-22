// models/purchaseModel.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  // item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  itemName: String,
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  unitPrice: Number,
  totalAmount: Number,
  remaining: Number
});


// ✅ Check if model already exists
module.exports = mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema);
