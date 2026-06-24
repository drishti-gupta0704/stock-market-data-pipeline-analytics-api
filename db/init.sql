
CREATE TABLE IF NOT EXISTS stocks (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    company_name VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    price_change DECIMAL(10,2),
    percentage_change DECIMAL(5,2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_stock_entry
ON stocks(symbol, timestamp);