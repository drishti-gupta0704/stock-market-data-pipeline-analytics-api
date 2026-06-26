
require("dotenv").config();
const express = require("express");
const app = express();
require("./config/db");

require("./workers/stockWorker");

const stockRoutes = require("./routes/stockRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const { startStockCron } = require("./cron/stockCron");

app.use(express.json());
app.use("/analytics", analyticsRoutes);
app.use("/stocks", stockRoutes);

app.get("/", (req, res) => {
  res.send("Stock API Running");
});


startStockCron();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

