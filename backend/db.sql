-- backend/db.sql
-- Shreeji Complex Database Schema Configuration for PostgreSQL

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    password_hash TEXT NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS flats (
    flat_number VARCHAR(10) PRIMARY KEY,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Owned', 'Rented', 'Empty')),
    maintenance_amount DECIMAL(12, 2) NOT NULL DEFAULT 500.00
);

CREATE TABLE IF NOT EXISTS flat_emails (
    flat_number VARCHAR(10) REFERENCES flats(flat_number) ON DELETE CASCADE,
    email VARCHAR(150) NOT NULL,
    PRIMARY KEY (flat_number, email)
);

CREATE TABLE IF NOT EXISTS maintenance_status (
    flat_number VARCHAR(10) REFERENCES flats(flat_number) ON DELETE CASCADE,
    year INT NOT NULL,
    month VARCHAR(5) NOT NULL CHECK (month IN ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')),
    paid BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (flat_number, year, month)
);

CREATE TABLE IF NOT EXISTS payment_history (
    id SERIAL PRIMARY KEY,
    flat_number VARCHAR(10) REFERENCES flats(flat_number) ON DELETE CASCADE,
    payment_date DATE NOT NULL,
    months TEXT NOT NULL, -- JSON-serialized array of months paid, e.g., ["Jan (2026)", "Feb (2026)"]
    amount DECIMAL(12, 2) NOT NULL,
    mode VARCHAR(30) NOT NULL,
    remarks TEXT DEFAULT 'N/A'
);

CREATE TABLE IF NOT EXISTS budget_transactions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(15) NOT NULL CHECK (type IN ('Addition', 'Deduction')),
    txn_date DATE NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    reason TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(50) PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS otp_store (
    id SERIAL PRIMARY KEY,
    otp_type VARCHAR(20) NOT NULL CHECK (otp_type IN ('login', 'forgot', 'settings')),
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE
);