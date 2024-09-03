const express = require("express");
const router = express.Router();
const db = require("./../db/conn.js");

router.get("/", async (req, res) => {
  const collection = await db.collection("payments");
  const result = await collection.find().toArray();
  res.json(result).status(200);
});

module.exports = router;
