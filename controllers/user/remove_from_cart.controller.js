const db = require("../../db/conn.js");
const JSON = require("JSON");

module.exports = async (req, res) => {
  const { events } = req.body;
  const collection = await db.collection("users");
  const cart = JSON.parse(
    "[" +
      (
        await collection.findOne(
          { email: res.email },
          { projection: { cart: 1 } }
        )
      ).cart +
      "]"
  );
  const result = await collection.updateOne(
    { email: res.email },
    { $set: { cart: cart.filter((item)=>!events.includes(item)) } }
  );
  res.json(result).status(200);
};
