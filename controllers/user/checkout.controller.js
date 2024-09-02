const db = require("./../../db/conn.js");
const JSON = require("JSON");
const axios = require("axios");

const update_events_registered = async (email) => {
  const collection = await db.collection("users");
  const info = await collection.findOne(
    { email: email },
    { projection: { cart: 1, registered: 1 } }
  );
  const registered = JSON.parse("[" + info.registered + "]");
  const cart = JSON.parse("[" + info.cart + "]");
  const result = await collection.updateOne(
    { email: res.email },
    { $set: { registered: registered.concat(cart), cart: [] } }
  );
  return result;
};

module.exports = async (req, res) => {
  const { image_url } = req.body;
  await update_events_registered(res.email);
  res.json({ image_url: image_url }).status(200);
};
