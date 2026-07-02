
const IORedis = require("ioredis");
const logger = require("../utils/logger");

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  
  maxRetriesPerRequest: null
});

connection.on("connect", () => {
  logger.info("Redis Connected");
});

connection.on("error", (err) => {
  logger.error(`Redis Error: ${err.message}`);
});

module.exports = connection;