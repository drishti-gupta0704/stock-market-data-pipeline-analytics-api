
const { Pool } = require("pg");
require("dotenv").config();
const logger = require("../utils/logger");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.query("SELECT 1")
  .then(() => logger.info("PostgreSQL Connected"))
  .catch(err => logger.error(`DB Error: ${err.message}`));

module.exports = pool;



