
const axios = require("axios");
const { transformStockData } = require("../utils/stockTransformer");
const { saveStockData } = require("./stockDBService");

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const getStockData = async (symbol) => {
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

    const response = await axios.get(url);

    const rawData = response.data["Global Quote"];

    if (!rawData) {
      throw new Error("Invalid API response");
    }

    const transformedData =  transformStockData(rawData);
    
    // return transformedData;
    
    const savedStock = await saveStockData(transformedData);
    return savedStock;
  

  } catch (error) {
    console.error("Stock API Error:", error.message);
    throw error;
  }
};

module.exports = { getStockData };