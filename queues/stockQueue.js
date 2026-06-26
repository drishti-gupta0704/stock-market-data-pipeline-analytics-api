
const { Queue } = require("bullmq");
const connection = require("../config/redis");

const stockQueue = new Queue("stockQueue", {
  connection
});

module.exports = stockQueue;