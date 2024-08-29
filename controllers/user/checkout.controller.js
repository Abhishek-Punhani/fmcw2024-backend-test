const db = require("./../../db/conn.js");
const JSON = require("JSON");

module.exports = async (req, res) => {
  if (res.auth) {
    const { events } = req.body;
    const collection = await db.collection("users");
    const registered = JSON.parse(
      "[" +
        (
          await collection.findOne(
            { email: res.email },
            { projection: { registered: 1 } }
          )
        ).registered +
        "]"
    );
    const result = await collection.updateOne(
      { email: res.email },
      { $set: { registered: registered.concat(events) } }
    );
    res.json(result).status(200);
  } else {
    res.redirect("/");
  }
};
