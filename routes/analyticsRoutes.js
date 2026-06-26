
const express = require("express");

const router = express.Router();

const {
  topGainers,
  topLosers,
  highestPrice,
  lowestPrice,
  averagePrice
} = require("../controllers/analyticsController");

router.get("/top-gainers", topGainers);
router.get("/top-losers", topLosers);
router.get("/highest-price", highestPrice);
router.get("/lowest-price", lowestPrice);
router.get("/average-price", averagePrice);

module.exports = router;