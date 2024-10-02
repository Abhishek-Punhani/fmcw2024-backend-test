const express = require("express");
const getEventsById=require("./../utils/events/events.js")
const router = express.Router();
const db = require("./../db/conn.js");

router.get("/", async (req, res) => {
  const collection = await db.collection("payments");
  const result = await collection.find().toArray();

  result.map((e)=>{e['purchased_events']=getEventsById(e['purchased_events'])})
  res.json(result).status(200);
});

module.exports = router;
