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


Follow the steps below to run this project on your local machine.

Prerequisites
Node.js must be installed

PostgreSQL must be installed and running

Steps to Run
Clone the repository
Open terminal and run the following command:
git clone https://github.com/your-username/balance-sheet-analyzer.git
Then navigate into the project folder:
cd balance-sheet-analyzer

Install the dependencies
Run this command to install the required packages:
npm install

Set up environment variables
Create a file named .env in the root directory of the project.
Add the following content to it, replacing the values with your PostgreSQL credentials:

DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name

Start the server
Run the following command in terminal:
node server.js

Open the application in your browser
Go to:
http://localhost:3000
