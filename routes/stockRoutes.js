
const express = require("express");
const router = express.Router();

const { fetchStock } = require("../controllers/stockController");

router.get("/:symbol", fetchStock);

module.exports = router;