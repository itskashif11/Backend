const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Invoice = require("./models/Invoice");

const app = express();

app.use(cors());

// ❗ DO NOT use express.json for file route issues
app.use(express.json());

// ================= CONNECT DB =================
mongoose.connect("mongodb://127.0.0.1:27017/invoiceERP");

// ================= MULTER =================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= NEXT INVOICE =================
app.get("/next-invoice", async (req, res) => {
  const last = await Invoice.findOne().sort({ invoiceNo: -1 });
  const nextNo = last ? last.invoiceNo + 1 : 1001;
  res.json({ nextNo });
});

// ================= GET INVOICE =================
app.get("/invoice/:no", async (req, res) => {
  const data = await Invoice.findOne({ invoiceNo: req.params.no });
  res.json(data);
});

// ================= SAVE + PDF =================
app.post("/save-invoice", upload.single("file"), async (req, res) => {
  try {

    const data = JSON.parse(req.body.data);

    const desktopPath = path.join(
      process.env.USERPROFILE,
      "Desktop",
      "SalesInvoice"
    );

    if (!fs.existsSync(desktopPath)) {
      fs.mkdirSync(desktopPath, { recursive: true });
    }

    const filePath = path.join(
      desktopPath,
      `Invoice_${data.invoiceNo}.pdf`
    );

    fs.writeFileSync(filePath, req.file.buffer);

    await Invoice.findOneAndUpdate(
      { invoiceNo: data.invoiceNo },
      { ...data, pdfPath: filePath },
      { upsert: true, new: true }
    );

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= START SERVER =================
app.listen(5000, () => {
  console.log("Backend running on port 5000");
});