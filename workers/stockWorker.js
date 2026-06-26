
const { Worker } = require("bullmq");
const connection = require("../config/redis");

const { getStockData } = require("../services/stockService");

const stockWorker = new Worker(
  "stockQueue",

  async (job) => {
    const { symbol } = job.data;
    console.log(`Processing ${symbol}`);
    await getStockData(symbol);
    console.log(`${symbol} Stored Successfully`);

  },

  {
    connection
  }
);

stockWorker.on("completed", (job) => {
  console.log(`Job ${job.id} Completed`);

});

stockWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} Failed`);
  console.error(err.message);

});