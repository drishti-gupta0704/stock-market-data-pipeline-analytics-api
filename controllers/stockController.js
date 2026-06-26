
const { getLatestStock } = require("../services/stockDBService");

const {
  getCachedStock,
  setCachedStock
} = require("../services/stockCacheService");

const fetchStock = async (req, res) => {

  try {

    const symbol = req.params.symbol.toUpperCase();

    const cachedStock =
      await getCachedStock(symbol);

    if (cachedStock) {

      console.log("Cache Hit");

      return res.json({
        success: true,
        source: "Redis Cache",
        data: cachedStock
      });

    }

    console.log("Cache Miss");

    const stock =
      await getLatestStock(symbol);

    if (!stock) {

      return res.status(404).json({
        success: false,
        message: "Stock not found"
      });

    }

    await setCachedStock(symbol, stock);

    res.json({
      success: true,
      source: "PostgreSQL",
      data: stock
    });

  }

  catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

module.exports = {
  fetchStock
};