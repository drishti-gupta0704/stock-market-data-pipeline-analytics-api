
const redis = require("../config/redis");

const CACHE_EXPIRY = 60;

const getCachedStock = async (symbol) => {

  const cachedData = await redis.get(`stock:${symbol}`);

  if (!cachedData) {
    return null;
  }

  return JSON.parse(cachedData);

};

const setCachedStock = async (symbol, data) => {

  await redis.set(
    `stock:${symbol}`,
    JSON.stringify(data),
    "EX",
    CACHE_EXPIRY
  );

};

module.exports = {
  getCachedStock,
  setCachedStock
};