const express = require("express");
const cors = require("cors");
const Transaction = require("./models/transaction.js");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json("test ok");
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  const { price, name, description, datetime } = req.body;
  const transaction = await Transaction.create({
    price,
    name,
    description,
    datetime,
  });
  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(port);
