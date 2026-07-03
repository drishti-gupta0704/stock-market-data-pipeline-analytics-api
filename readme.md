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

