const express = require("express")
const router = express.Router()
const passport = require('passport')
const jwt = require("jsonwebtoken")
const db = require("./../db/conn.js");
router.get("/",(req,res)=>{res.send("auth")})

router.get('/login', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}),async (req, res) => {
    const collection = await db.collection('users')
    const email = jwt.verify(req.user.token,process.env.JWT_SECRET)['email'][0]['value'];
    const result = await collection.findOne({email:email})
    if(result) res.json({'authToken':req.user.token,'newUser':false}).status(200)
    else res.json({'authToken':req.user.token,'newUser':true}).status(200)
});

router.get('/logout',(req,res)=>{
    res.json({'message':'logged out'}).status(200);
})
module.exports=router