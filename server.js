const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const atmSchema = new mongoose.Schema({
  location: String,
  city: String,
  status: { type: String, default: "Working" },
  lastUpdated: { type: Date, default: Date.now }
});
const ATM = mongoose.model("ATM", atmSchema);

// Routes
app.get("/api/atms", async (req, res) => {
  const atms = await ATM.find();
  res.json(atms);
});

app.post("/api/atms", async (req, res) => {
  const atm = new ATM(req.body);
  await atm.save();
  res.json({ message: "ATM added!", atm });
});

app.put("/api/atms/:id", async (req, res) => {
  const atm = await ATM.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "ATM updated!", atm });
});

app.delete("/api/atms/:id", async (req, res) => {
  await ATM.findByIdAndDelete(req.params.id);
  res.json({ message: "ATM removed!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
console.log("Starting server...");
