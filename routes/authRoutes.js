const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/login", async (req, res) => {

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Invalid password");

  const token = jwt.sign({ id: user._id }, "SECRET");

  res.json({ token });
});

module.exports = router;