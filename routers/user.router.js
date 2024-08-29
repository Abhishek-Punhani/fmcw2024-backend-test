const express = require("express");
const { route } = require("./auth.router");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const newController=require("./../controllers/user/new.controller.js");
const profileController=require("./../controllers/user/profile.controller.js");
const cartController=require("./../controllers/user/cart.controller.js");
const addToCartController=require("./../controllers/user/add_to_cart.controller.js");
const registeredController=require("./../controllers/user/registered.controller.js");
const checkoutController=require("./../controllers/user/checkout.controller.js");

router.use(authMiddleware);

router.get("/", (req, res) => {
  if (res.auth) {
    res.json({ auth: true, email: res.email });
  } else {
    res.json({ auth: false });
  }
});

router.post("/new", newController)
router.get('/profile',profileController)
router.get('/cart',cartController)
router.get('/registered',registeredController)
router.post('/add_to_cart',addToCartController)
router.post('/checkout',checkoutController)

module.exports = router;