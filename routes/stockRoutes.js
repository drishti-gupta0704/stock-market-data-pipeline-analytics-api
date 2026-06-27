
const express = require("express");
const router = express.Router();

const { fetchStock , fetchStockHistory} = require("../controllers/stockController");

router.get("/history/:symbol", fetchStockHistory );

router.get("/:symbol", fetchStock);

module.exports = router;