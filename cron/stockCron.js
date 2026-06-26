
const cron = require("node-cron");

const stockQueue = require("../queues/stockQueue");

const STOCK_SYMBOLS = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA"
];

const startStockCron = () => {

  console.log("Cron Scheduler Started");

  cron.schedule("*/5 * * * *", async () => {

    console.log("Adding Jobs To Queue...");

    for (const symbol of STOCK_SYMBOLS) {

      await stockQueue.add(
        "fetchStock",
        {
          symbol
        }
      );

      console.log(`${symbol} Job Added`);

    }

  });

};

module.exports = {
  startStockCron
};