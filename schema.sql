CREATE TABLE balance_sheets (
  id SERIAL PRIMARY KEY,
  company TEXT,
  current_assets NUMERIC,
  non_current_assets NUMERIC,
  current_liabilities NUMERIC,
  non_current_liabilities NUMERIC,
  equity NUMERIC,
  revenue NUMERIC,
  net_income NUMERIC,
  ebit NUMERIC,
  interest_expense NUMERIC,
  total_assets NUMERIC,
  total_liabilities NUMERIC,
  inventory NUMERIC
);
