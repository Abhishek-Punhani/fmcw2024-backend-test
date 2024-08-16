const express = require("express")
const cors = require("cors")
const passport = require('./middlewares/passport.middleware.js')
const session = require('express-session')
const cookieParser = require("cookie-parser")

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

app.get('/',(req,res)=>{res.send("server started")})

const auth_router = require("./routers/auth.router.js")
app.use('/api/auth',auth_router)

app.listen(8080)