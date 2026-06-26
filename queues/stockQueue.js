
const { Queue } = require("bullmq");
const connection = require("../config/redis");

const stockQueue = new Queue("stockQueue", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "fixed",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: 100,
  },
});

module.exports = stockQueue;