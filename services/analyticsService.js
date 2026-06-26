
const pool = require("../config/db");

const getTopGainers = async () => {

  const query = `
    SELECT *
    FROM stocks
    ORDER BY percentage_change DESC
    LIMIT 5;
  `;

  const result = await pool.query(query);
  return result.rows;
};


const getTopLosers = async () => {

  const query = `
    SELECT *
    FROM stocks
    ORDER BY percentage_change ASC
    LIMIT 5;
  `;

  const result = await pool.query(query);
  return result.rows;
};


const getHighestPrice = async () => {

  const query = `
    SELECT *
    FROM stocks
    ORDER BY price DESC
    LIMIT 1;
  `;

  const result = await pool.query(query);
  return result.rows[0];
};


const getLowestPrice = async () => {

  const query = `
    SELECT *
    FROM stocks
    ORDER BY price ASC
    LIMIT 1;
  `;

  const result = await pool.query(query);
  return result.rows[0];
};

const getAveragePrice = async () => {

  const query = `
    SELECT AVG(price) AS average_price
    FROM stocks;
  `;

  const result = await pool.query(query);
  return result.rows[0];
};

module.exports = {
  getTopGainers,
  getTopLosers,
  getHighestPrice,
  getLowestPrice,
  getAveragePrice
};