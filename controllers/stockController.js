
const { getStockData } = require("../services/stockService");

const fetchStock = async (req, res) => {
  try {
    const symbol = req.params.symbol;

    if (!symbol) {
      return res.status(400).json({ error: "Symbol is required" });
    }

    const data = await getStockData(symbol);

    res.json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      // message: "Failed to fetch stock data"
       message: error.message
    });
  }
};

module.exports = { fetchStock };