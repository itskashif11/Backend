// const mongoose = require("mongoose");

// const InvoiceSchema = new mongoose.Schema({
//   invoiceNo: Number,
//   date: String,
//   seller: Object,
//   buyer: Object,
//   rows: Array,
//   pdfPath: String
// });

// module.exports = mongoose.model("Invoice", InvoiceSchema);

// const mongoose = require("mongoose");

const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNo: Number,
  date: String,
  seller: Object,
  buyer: Object,
  items: Array,
  total: Number,
  pdfPath: String
});

module.exports = mongoose.model("Invoice", invoiceSchema);