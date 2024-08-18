const express = require("express");
const { route } = require("./auth.router");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const db = require("./../db/conn.js");
const mongoose = require("mongoose");
const JSON = require("JSON")
router.use(authMiddleware);

router.get("/", (req, res) => {
  if (res.auth) {
    res.json({ auth: true, email: res.email });
  } else {
    res.json({ auth: false });
  }
});

router.post("/new", async (req, res) => {
  if (res.auth) {
    const {name,age,phone}=req.body;
    const collection = await db.collection("users");
    const new_user = {
        "name":name,
        "age":age,
        "phone":phone,
        "email":res.email,
        "cart":[],
        "registered":[]
    }
    result = await collection.insertOne(new_user);
    res.json(result).status(201);
  } else {
    res.redirect("/");
  }
});

router.get('/profile',async (req,res)=>{
  if(res.auth){
    const collection = await db.collection('users')
    result = await collection.findOne({email:res.email},{projection:{cart:0,registered:0}})
    res.json(result).status(200)

  }else{
    res.redirect("/");
  }
})

router.get('/cart',async(req,res)=>{
  if(res.auth){
    const collection = await db.collection('users')
    result = await collection.findOne({email:res.email},{projection:{cart:1}})
    res.json(result.cart).status(200)
  }else{
    res.redirect("/");
  }
})
router.get('/registered',async(req,res)=>{
  if(res.auth){
    const collection = await db.collection('users')
    result = await collection.findOne({email:res.email},{projection:{registered:1}})
    res.json(result.registered).status(200)
  }else{
    res.redirect("/");
  }
})

router.post('/add_to_cart',async (req,res)=>{
  if(res.auth){
    const {events}=req.body;
    const collection = await db.collection('users')
    const cart = JSON.parse('['+(await collection.findOne({email:res.email},{projection:{cart:1}})).cart+']')
    const result = await collection.updateOne({email:res.email},{$set:{cart:cart.concat(events)}})
    res.json(result).status(200)
  }else{
    res.redirect("/");
  }

})
router.post('/checkout',async (req,res)=>{
  if(res.auth){
    const {events}=req.body;
    const collection = await db.collection('users')
    const registered = JSON.parse('['+(await collection.findOne({email:res.email},{projection:{registered:1}})).registered+']')
    const result = await collection.updateOne({email:res.email},{$set:{registered:registered.concat(events)}})
    res.json(result).status(200)
  }else{
    res.redirect("/");
  }

})

module.exports = router;