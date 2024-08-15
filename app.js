const express = require("express")
const cors = require("cors")

const app = express();
app.use(cors());

app.get('/',(req,res)=>{res.send("server started")})

const auth_router = require("./routers/auth.router.js")
app.use('/api/auth',auth_router)

app.listen(8080)