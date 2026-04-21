// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// const Invoice = require("./models/Invoice");

// const app = express();

// app.use(cors());

// // ❗ DO NOT use express.json for file route issues
// app.use(express.json());

// // ================= CONNECT DB =================
// mongoose.connect("mongodb://127.0.0.1:27017/invoiceERP");

// // ================= MULTER =================
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ================= NEXT INVOICE =================
// app.get("/next-invoice", async (req, res) => {
//   const last = await Invoice.findOne().sort({ invoiceNo: -1 });
//   const nextNo = last ? last.invoiceNo + 1 : 1001;
//   res.json({ nextNo });
// });

// // ================= GET INVOICE =================
// app.get("/invoice/:no", async (req, res) => {
//   const data = await Invoice.findOne({ invoiceNo: req.params.no });
//   res.json(data);
// });

// // ================= SAVE + PDF =================
// app.post("/save-invoice", upload.single("file"), async (req, res) => {
//   try {

//     const data = JSON.parse(req.body.data);

//     const desktopPath = path.join(
//       process.env.USERPROFILE,
//       "Desktop",
//       "SalesInvoice"
//     );

//     if (!fs.existsSync(desktopPath)) {
//       fs.mkdirSync(desktopPath, { recursive: true });
//     }

//     const filePath = path.join(
//       desktopPath,
//       `Invoice_${data.invoiceNo}.pdf`
//     );

//     fs.writeFileSync(filePath, req.file.buffer);

//     await Invoice.findOneAndUpdate(
//       { invoiceNo: data.invoiceNo },
//       { ...data, pdfPath: filePath },
//       { upsert: true, new: true }
//     );

//     res.json({ success: true });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ================= START SERVER =================
// app.listen(5000, () => {
//   console.log("Backend running on port 5000");
// });




//Production ready code

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config();

// const Invoice = require("./models/Invoice");

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(cors());
// app.use(express.json());

// // ================= DB CONNECTION =================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected ✅"))
//   .catch(err => console.log(err));

// // ================= ROOT ROUTE =================
// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

// // ================= MULTER =================
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ================= FILE STORAGE (SERVER FOLDER) =================
// const uploadDir = path.join(__dirname, "uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // ================= NEXT INVOICE =================
// app.get("/next-invoice", async (req, res) => {
//   try {
//     const last = await Invoice.findOne().sort({ invoiceNo: -1 });
//     const nextNo = last ? last.invoiceNo + 1 : 1001;
//     res.json({ nextNo });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ================= GET INVOICE =================
// app.get("/invoice/:no", async (req, res) => {
//   try {
//     const data = await Invoice.findOne({ invoiceNo: req.params.no });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ================= SAVE + PDF =================
// app.post("/save-invoice", upload.single("file"), async (req, res) => {
//   try {
//     const data = JSON.parse(req.body.data);

//     const filePath = path.join(
//       uploadDir,
//       `Invoice_${data.invoiceNo}.pdf`
//     );

//     // Save PDF file
//     fs.writeFileSync(filePath, req.file.buffer);

//     // Save to DB
//     await Invoice.findOneAndUpdate(
//       { invoiceNo: data.invoiceNo },
//       { ...data, pdfPath: filePath },
//       { upsert: true, new: true }
//     );

//     res.json({ success: true });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


//final down

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config();

// const Invoice = require("./models/Invoice");

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(cors({
//   origin: "*"
// }));

// app.use(express.json());

// // ================= DB CONNECTION =================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected ✅"))
//   .catch(err => console.log(err));

// // ================= ROOT ROUTE =================
// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

// // ================= MULTER =================
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ================= FILE STORAGE =================
// const uploadDir = path.join(__dirname, "uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // ================= NEXT INVOICE =================
// app.get("/next-invoice", async (req, res) => {
//   try {
//     const last = await Invoice.findOne().sort({ invoiceNo: -1 });
//     const nextNo = last ? last.invoiceNo + 1 : 1001;
//     res.json({ nextNo });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ================= GET INVOICE =================
// app.get("/invoice/:no", async (req, res) => {
//   try {
//     const data = await Invoice.findOne({ invoiceNo: req.params.no });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ================= SAVE INVOICE =================
// app.post("/save-invoice", upload.single("file"), async (req, res) => {
//   try {
//     const data = JSON.parse(req.body.data);

//     const filePath = path.join(
//       uploadDir,
//       `Invoice_${data.invoiceNo}.pdf`
//     );

//     fs.writeFileSync(filePath, req.file.buffer);

//     await Invoice.findOneAndUpdate(
//       { invoiceNo: data.invoiceNo },
//       { ...data, pdfPath: filePath },
//       { upsert: true, new: true }
//     );

//     res.json({ success: true });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const Invoice = require("./models/Invoice");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({ origin: "*" }));
app.use(express.json());

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ================= MULTER =================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= FILE STORAGE =================
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ================= DB CONNECTION =================
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    // ONLY START SERVER AFTER DB CONNECTS
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌:", err.message);
  });

// ================= NEXT INVOICE =================
app.get("/next-invoice", async (req, res) => {
  try {
    const last = await Invoice.findOne().sort({ invoiceNo: -1 });
    const nextNo = last ? last.invoiceNo + 1 : 1001;

    res.json({ nextNo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET INVOICE =================
app.get("/invoice/:no", async (req, res) => {
  try {
    const data = await Invoice.findOne({ invoiceNo: req.params.no });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= SAVE INVOICE =================
app.post("/save-invoice", upload.single("file"), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);

    const filePath = path.join(
      uploadDir,
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
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});