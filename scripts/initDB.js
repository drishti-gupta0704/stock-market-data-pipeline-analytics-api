

const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

const initDB = async () => {
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, "../db/init.sql"),
      "utf8"
    );

    await pool.query(sql);

    console.log("Tables created successfully");
    process.exit();
  } catch (err) {
    console.error("Error creating tables:", err);
    process.exit(1);
  }
};

initDB();