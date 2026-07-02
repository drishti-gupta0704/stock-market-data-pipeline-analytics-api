
const { Parser } = require("json2csv");

const {
  getAllStocks,
  getStocksBySymbol
} = require("../services/exportService");

const exportAllStocks = async (req, res) => {

  try {

    const stocks = await getAllStocks();
    const parser = new Parser();
    const csv = parser.parse(stocks);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment("stocks.csv");
    return res.send(csv);

  }
   catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

const exportStockBySymbol = async (req, res) => {

  try {

    const symbol = req.params.symbol;
    const stocks = await getStocksBySymbol(symbol);
    const parser = new Parser();
    const csv = parser.parse(stocks);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment(`${symbol}.csv`);
    return res.send(csv);

  } 
  
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

module.exports = {
  exportAllStocks,
  exportStockBySymbol
};