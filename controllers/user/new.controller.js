const db = require("./../../db/conn.js");

module.exports = async (req, res) => {
  const { name, age, phone } = req.body;
  const collection = await db.collection("users");
  const new_user = {
    name: name,
    age: age,
    phone: phone,
    email: res.email,
    cart: [],
    registered: [],
  };
  result = await collection.insertOne(new_user);
  res.json(result).status(201);
};
