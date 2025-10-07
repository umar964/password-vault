const mongoose = require("mongoose");

const vaultItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  username: String,
  password: String,  
  url: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VaultItem", vaultItemSchema);
