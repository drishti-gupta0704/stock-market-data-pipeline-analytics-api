const pool = require("../config/db");

const getAllStocks = async () => {

  const query = `
    SELECT *
    FROM stocks
    ORDER BY timestamp DESC;
  `;

  const result = await pool.query(query);
  return result.rows;

};

const getStocksBySymbol = async (symbol) => {

  const query = `
    SELECT *
    FROM stocks
    WHERE symbol = $1
    ORDER BY timestamp DESC;
  `;

  const result = await pool.query(query, [symbol]);
  return result.rows;

};

module.exports = {
  getAllStocks,
  getStocksBySymbol
};