const db = require("./../../db/conn.js");
const JSON = require("JSON");

module.exports = async (req, res) => {
  if (res.auth) {
    // const { events } = req.body;
    const collection = await db.collection("users");
    const info = await collection.findOne(
      { email: res.email },
      { projection: { cart: 1, registered: 1 } }
    );
    const registered = JSON.parse(
      "[" +
        info.registered +
        "]"
    );
    const cart = JSON.parse(
      "[" +
        info.cart +
        "]"
    );
    const result = await collection.updateOne(
      { email: res.email },
      { $set: { registered: registered.concat(cart),cart:[] } }
    );
    res.json(result).status(200);
  } else {
    res.json({ message: "Forbidden" }).status(400);
  }
};
