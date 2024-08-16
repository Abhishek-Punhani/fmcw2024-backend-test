const express = require("express")
const router = express.Router()
const passport = require('passport')
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{res.send("auth")})

router.get('/login', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}),(req, res) => {
    res.cookie('authToken', req.user.token);
    res.cookie('isLoggedIn',true);
    res.redirect('/');
});

router.get('/access',(req,res)=>{
    if(!req.cookies['isLoggedIn'] || req.cookies['isLoggedIn']==="false") {
        res.status(401)
        res.json({'message':'not logged in'})
    }else{
        try{
            const email = jwt.verify(req.cookies['authToken'],process.env.JWT_SECRET)['email'][0]['value'];
            res.status(200)
            res.json({'email':email})
        }catch(err){
            res.status(404)
            res.json({'error':err})
        }
    }
    res.end()
})

router.get('/logout',(req,res)=>{
    if(!req.cookies['isLoggedIn'] || req.cookies['isLoggedIn']==="false") {
        res.redirect('/');
    }else{
        res.clearCookie('authToken');
        res.cookie('isLoggedIn',false);
        res.redirect('/');
    }
})
module.exports=router