const express = require("express");

const {
  getFilteredProducts,
  getProductsDetails,
  fetchAllReviews
} = require("../../controllers/shop/products-controller")

const router = express.Router();


router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductsDetails);
router.get("/reviews", fetchAllReviews);

module.exports = router;
