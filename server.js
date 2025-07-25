// Load environment variables from .env
require('dotenv').config();

// Import dependencies
const express = require('express');
const multer = require('multer');         // For handling file uploads
const csv = require('csv-parser');        // For parsing CSV files
const fs = require('fs');                 // For file system operations
const { Pool } = require('pg');           // PostgreSQL client
const cors = require('cors');             // Enable CORS
const path = require('path');

const app = express();
const port = 3000;

// Configure multer to save uploaded files in the 'uploads' directory
const upload = multer({ dest: 'uploads/' });

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static frontend files from 'public' directory
app.use(express.static('public'));

// Setup PostgreSQL database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'balance_analyzer',
  password: process.env.DB_PASSWORD //password hidden 
  port: 5432,
});

// Log errors to a local file for easier debugging
function logError(error) {
  const errorLog = `[${new Date().toISOString()}] ${error.stack || error}\n`;
  fs.appendFile('error.log', errorLog, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });
}

// Validate a row to ensure it contains all necessary financial fields
function isValidRow(row) {
  return (
    row.company &&
    !isNaN(row.current_assets) &&
    !isNaN(row.non_current_assets) &&
    !isNaN(row.current_liabilities) &&
    !isNaN(row.non_current_liabilities) &&
    !isNaN(row.equity) &&
    !isNaN(row.revenue) &&
    !isNaN(row.net_income) &&
    !isNaN(row.ebit) &&
    !isNaN(row.interest_expense) &&
    !isNaN(row.total_assets) &&
    !isNaN(row.total_liabilities) &&
    !isNaN(row.inventory)
  );
}

// Endpoint: Handle CSV upload and store valid financial data in the database
app.post('/upload', upload.single('file'), (req, res) => {
  const results = [];
  try {
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          const validRows = results.filter(isValidRow);
          
          // Insert each valid row into the PostgreSQL database
          for (let row of validRows) {
            await pool.query(
              `INSERT INTO balance_sheets(
                company, current_assets, non_current_assets,
                current_liabilities, non_current_liabilities, equity,
                revenue, net_income, ebit, interest_expense,
                total_assets, total_liabilities, inventory
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
              [
                row.company,
                parseFloat(row.current_assets),
                parseFloat(row.non_current_assets),
                parseFloat(row.current_liabilities),
                parseFloat(row.non_current_liabilities),
                parseFloat(row.equity),
                parseFloat(row.revenue),
                parseFloat(row.net_income),
                parseFloat(row.ebit),
                parseFloat(row.interest_expense),
                parseFloat(row.total_assets),
                parseFloat(row.total_liabilities),
                parseFloat(row.inventory)
              ]
            );
          }

          // Delete the uploaded file after processing
          fs.unlink(req.file.path, () => {});
          res.json({ message: 'File processed successfully' });
        } catch (err) {
          logError(err);
          res.status(500).json({ error: 'Failed to insert data' });
        }
      });
  } catch (err) {
    logError(err);
    res.status(500).json({ error: 'Failed to process file' });
  }
});

// Endpoint: Analyze financial data and return performance metrics
app.get('/analyze', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM balance_sheets');

    // Calculate financial ratios and assign performance label
    const analyzed = rows.map((data) => {
      const currentRatio = data.current_assets / data.current_liabilities;
      const quickRatio = (data.current_assets - data.inventory) / data.current_liabilities;
      const debtToEquity = data.total_liabilities / data.equity;
      const interestCoverage = data.ebit / data.interest_expense;
      const assetTurnover = data.revenue / data.total_assets;
      const inventoryTurnover = data.revenue / data.inventory;
      const returnOnAssets = data.net_income / data.total_assets;
      const returnOnEquity = data.net_income / data.equity;

      // Determine company performance based on ratio thresholds
      let performance = 'Average';
      if (
        currentRatio > 1.5 &&
        quickRatio > 1 &&
        debtToEquity < 1.5 &&
        interestCoverage > 2 &&
        returnOnAssets > 0.05 &&
        returnOnEquity > 0.1
      ) {
        performance = 'Good';
      } else if (
        currentRatio < 1 ||
        quickRatio < 0.8 ||
        debtToEquity > 2.5 ||
        interestCoverage < 1.5 ||
        returnOnAssets < 0.02 ||
        returnOnEquity < 0.05
      ) {
        performance = 'Poor';
      }

      return {
        ...data,
        currentRatio,
        quickRatio,
        debtToEquity,
        interestCoverage,
        assetTurnover,
        inventoryTurnover,
        returnOnAssets,
        returnOnEquity,
        performance
      };
    });

    res.json(analyzed);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: 'Failed to analyze data' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
