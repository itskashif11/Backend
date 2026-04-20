const router = require("express").Router();
const Invoice = require("../models/Invoice");

// SAVE INVOICE
router.post("/", async (req, res) => {
  const invoice = new Invoice(req.body);
  await invoice.save();
  res.json(invoice);
});

// GET ALL
router.get("/", async (req, res) => {
  const data = await Invoice.find();
  res.json(data);
});

module.exports = router;