const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const VaultItem = require("../models/vault");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

router.post("/", auth, async (req, res) => {
  const item = await VaultItem.create({ ...req.body, userId: req.user });
  res.json(item);
});

router.get("/", auth, async (req, res) => {
  const items = await VaultItem.find({ userId: req.user });
  res.json(items);
});

router.put("/:id", auth, async (req, res) => {
  const item = await VaultItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete("/:id", auth, async (req, res) => {
  await VaultItem.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

router.put("/:id", auth, async (req, res) => {
  try {
    const item = await VaultItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user }, 
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ msg: "Item not found or not authorized" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
