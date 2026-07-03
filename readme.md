# Stock Market Data Pipeline & Analytics API

A real-time backend system that fetches, processes, and analyzes stock market data using a scalable ETL pipeline architecture with queues, caching, and analytics

##  Features
- Real-time stock data ingestion using external APIs (Alpha Vantage)
- ETL pipeline (Extract → Transform → Load)
- Background job processing using BullMQ + Redis
- Automated cron-based data fetching
- Analytics APIs:
   - Top gainers
   - Top losers
   - Moving averages
   - Trend analysis
- Data caching using Redis for fast responses
- Persistent storage using Postgres
- Retry mechanism for failed API calls
- CSV export support for stock data
- RESTful API architecture
- Clean logging for monitoring using winston

---
--- 

# Endpoints and Url 

### Base URL
https://stock-market-data-pipeline-analytics-api.onrender.com

---

### Stock APIs

  Get Latest Stock Data
- **GET** `/stocks/:symbol`
Example: https://stock-market-data-pipeline-analytics-api.onrender.com/stocks/AAPL
 Get Stock History
- **GET** `/stocks/history/:symbol`
Example: https://stock-market-data-pipeline-analytics-api.onrender.com/stocks/history/AAPL
  Get Stock History (Date Range)
- **GET** `/stocks/history/:symbol?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
Example: https://stock-market-data-pipeline-analytics-api.onrender.com/stocks/history/AAPL?startDate=2026-06-26&endDate=2026-06-27


---

###  Analytics APIs

Top Gainers
- **GET** `/analytics/top-gainers`
Example: https://stock-market-data-pipeline-analytics-api.onrender.com/analytics/top-gainers

Top Losers
- **GET** `/analytics/top-losers`
Example: https://stock-market-data-pipeline-analytics-api.onrender.com/analytics/top-losers

Highest Price
- **GET** `/analytics/highest-price`
Lowest Price
- **GET** `/analytics/lowest-price`
Average Price
- **GET** `/analytics/average-price`

---

### Export APIs

  Export All Stocks (CSV)
- **GET** `/export/csv`
Example: https://stock-market-data-pipeline-analytics-api.onrender.com/export/csv
  Export Specific Stock (CSV)
- **GET** `/export/csv/:symbol`
Example: https://stock-market-data-pipeline-analytics-api.onrender.com/export/csv/AAPL