const express = require("express");
const cors = require("cors");
const Transaction = require("./models/transaction.js");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json("test ok");
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  const { name, description, datetime } = req.body;
  const transaction = await Transaction.create({ name, description, datetime });
  res.json(transaction);
});

app.listen(5000);

// jx0OZzTReNaVY482
