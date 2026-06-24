
const axios = require("axios");

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const getStockData = async (symbol) => {
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

    const response = await axios.get(url);

    const data = response.data["Global Quote"];

    if (!data) {
      throw new Error("Invalid API response");
    }

    return {
      symbol: data["01. symbol"],
      price: parseFloat(data["05. price"]),
      change: parseFloat(data["09. change"]),
      percentChange: data["10. change percent"],
      timestamp: new Date()
    };

  } catch (error) {
    console.error("Stock API Error:", error.message);
    throw error;
  }
};

module.exports = { getStockData };