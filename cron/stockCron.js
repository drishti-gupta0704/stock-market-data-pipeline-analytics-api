
const cron = require("node-cron");
const { getStockData } = require("../services/stockService");

const STOCK_SYMBOLS = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA"
];

const startStockCron = () => {
  
  console.log("Cron Scheduler Started...");

  cron.schedule("*/5 * * * *", async () => {

    console.log("Running Stock Cron Job...");

    for (const symbol of STOCK_SYMBOLS) {

      try {
        const stock = await getStockData(symbol);
        console.log(`${symbol} stored successfully`);

      } catch (err) {
        console.error(`${symbol}: ${err.message}`);

      }

    }

  });

};

module.exports = {
  startStockCron
};