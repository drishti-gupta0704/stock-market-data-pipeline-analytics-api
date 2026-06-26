
const pool = require("../config/db");

const saveStockData = async (stockData) => {

  const query = `
    INSERT INTO stocks
    (
      symbol,
      price,
      price_change,
      percentage_change,
      timestamp
    )
    VALUES ($1,$2,$3,$4,$5)

    ON CONFLICT(symbol, timestamp)
    DO NOTHING
    
    RETURNING *;
  `;

  const values = [
    stockData.symbol,
    stockData.price,
    stockData.priceChange,
    stockData.percentChange,
    stockData.timestamp
  ];
    
    

  const result =
    await pool.query(query, values);

  return result.rows[0];
};



const getLatestStock = async (symbol) => {

  const query = `
    SELECT *
    FROM stocks
    WHERE symbol = $1
    ORDER BY timestamp DESC
    LIMIT 1;
  `;

  const result = await pool.query(query, [symbol]);

  return result.rows[0];

};

module.exports = {
  saveStockData,
  getLatestStock
};