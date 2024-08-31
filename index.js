const express = require("express");
const cors = require("cors");
const passport = require('./middlewares/passport.middleware.js')
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server started");
});

const auth_router = require("./routers/auth.router.js");
const user_router = require("./routers/user.router.js");
const events_router = require("./routers/event.router.js");

const api = express.Router();
api.use("/auth", auth_router);
api.use("/user", user_router);
api.use("/events", events_router);

app.use("/api", api);
app.listen(8080);

module.exports = app;
