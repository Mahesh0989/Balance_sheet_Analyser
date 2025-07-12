# Balance_sheet_Analyser
A clean and scalable web app to evaluate companies financial statements, helping users make informed investment decisions.


The Balance Sheet Analyzer is a full-stack web application that allows users to upload and analyze a company's balance sheet in CSV format. It calculates key financial ratios, evaluates performance, and assesses the risk profile of the company based on the uploaded data.

This project was developed as a practical financial tool and as a demonstration of my ability to build complete applications from frontend to backend with real-world relevance.



## Features
• Upload CSV files containing balance sheet data
• Automatically extract and process financial information
• Calculate financial ratios such as current ratio and debt-to-equity
• Rate the company’s performance as Good, Average, or Poor
• Evaluate risk level as Low, Medium, or High
• Store uploaded data securely using a PostgreSQL database
• Simple and responsive frontend interface
• REST API for financial logic and communication



## Tech Stack

Frontend: HTML, CSS, JavaScript  
Backend: Node.js, Express  
Database: PostgreSQL 
Tools: Git, GitHub, VS Code



## Project Structure
├── public/ ( Frontend files (HTML, CSS, JS))
├── uploads/ # Uploaded CSV files (excluded from GitHub)
├── .gitignore
├── package.json
├── server.js
└── README.md


Getting Started
This guide explains how to set up and run the Balance Sheet Analyzer on your local system.

1. Prerequisites
Install Node.js (for running the backend server)

Install PostgreSQL (for database connectivity)

2. Clone the Repository
Open a terminal or command prompt

Run the following command:
git clone https://github.com/your-username/balance-sheet-analyzer.git

Navigate into the project folder:
cd balance-sheet-analyzer

3. Install Dependencies
Make sure you're inside the project folder

Run this command to install all required Node.js packages:
npm install

4. Configure Environment Variables
Create a new file named .env in the root directory

Add the following lines with your PostgreSQL credentials:

ini
Copy
Edit
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
5. Start the Server
Run the backend server using this command:
node server.js

6. Open the Application
Go to your browser and visit:
http://localhost:3000
