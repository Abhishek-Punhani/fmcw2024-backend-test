const express = require("express")
const cors = require("cors")
const passport = require('middlewares/passport.middleware.js')
const session = require('express-session')
const cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(cors());
app.use(passport.initialize())
app.use(cookieParser())
app.use(express.json())

app.get('/',(req,res)=>{res.send("server started")})

const auth_router = require("../routers/auth.router.js")
const user_router = require("../routers/user.router.js")

const api=express.Router()
api.use('/auth',auth_router)
api.use('/user',user_router)

app.use('/api',api)
app.listen(process.env.BACKEND_PORT)

module.exports=app;