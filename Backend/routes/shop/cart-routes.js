const express = require("express");
const {
  addToCart,
  UpdateCartItemQuantity,
  deleteCartItem,
  fetchCartItems,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", UpdateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
