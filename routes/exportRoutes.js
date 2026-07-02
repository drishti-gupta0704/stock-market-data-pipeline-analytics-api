
const express = require("express");

const router = express.Router();

const {
  exportAllStocks,
  exportStockBySymbol
} = require("../controllers/exportController");

router.get("/csv", exportAllStocks);
router.get("/csv/:symbol", exportStockBySymbol);

module.exports = router;