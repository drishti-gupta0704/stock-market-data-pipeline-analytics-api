
const transformStockData = (data) => {

  if (!data["01. symbol"]) {
    throw new Error("Symbol missing");
  }

  if (!data["05. price"]) {
    throw new Error("Price missing");
  }

  return {
    symbol: data["01. symbol"],

    price: parseFloat(data["05. price"]),

    priceChange: parseFloat(data["09. change"]),

    percentChange: parseFloat(data["10. change percent"]),
    

    timestamp: new Date()
  };
};

module.exports = { transformStockData };