
const { getStockData } = require("../services/stockService");

const fetchStock = async (req, res) => {

  try {

    const symbol = req.params.symbol;

    if (!symbol) {
      return res.status(400).json({
        success: false,
        message: "Symbol required"
      });
    }

    const data = await getStockData(symbol);

    if (!data) {
      return res.json({
        success: true,
        message: "Duplicate entry skipped"
      });
    }

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  fetchStock
};