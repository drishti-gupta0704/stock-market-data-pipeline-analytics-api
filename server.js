
require("dotenv").config();
const express = require("express");
const app = express();
require("./config/db");
const logger = require("./utils/logger");

require("./workers/stockWorker");

const stockRoutes = require("./routes/stockRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const { startStockCron } = require("./cron/stockCron");
const exportRoutes = require("./routes/exportRoutes");

app.use(express.json());
app.use("/export", exportRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/stocks", stockRoutes);

app.get("/", (req, res) => {
  res.send("Stock API Running");
});


startStockCron();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

