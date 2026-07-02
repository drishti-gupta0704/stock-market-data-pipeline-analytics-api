
const { Worker } = require("bullmq");
const connection = require("../config/redis");
const { getStockData } = require("../services/stockService");
const logger = require("../utils/logger");

const stockWorker = new Worker(
  "stockQueue",

  async (job) => {
    const { symbol } = job.data;
    await getStockData(symbol);

  },

  {
    connection
  }
);

stockWorker.on("active", (job) => {
  console.log(`Job ${job.id} Started`);
  console.log(`Processing Stock: ${job.data.symbol}`);

});


stockWorker.on("completed", (job) => {
  loggers.info(`Job ${job.id} Completed Successfully`);
  console.log(`Stock: ${job.data.symbol}`);


});


stockWorker.on("failed", (job, err) => {
  logger.error(`Job ${job?.id} Failed: ${err.message}`);
  console.error(`Stock: ${job?.data?.symbol}`);
  console.error(`Reason: ${err.message}`);

});


stockWorker.on("error", (err) => {
  console.error("Worker Error:");
  console.error(err.message);
 

});

module.exports = stockWorker;