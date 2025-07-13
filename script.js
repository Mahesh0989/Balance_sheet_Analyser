// Handle CSV file upload form submission
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent default form submission

  const status = document.getElementById('status');
  status.textContent = ''; // Clear previous status messages

  // Get the selected file
  const file = document.getElementById('fileInput').files[0];
  const formData = new FormData();
  formData.append('file', file); // Append file to FormData object

  try {
    // Send file to backend server for processing
    const res = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');

    // Show success message
    status.style.color = 'green';
    status.textContent = data.message;

  } catch (err) {
    // Show error message if upload fails
    status.textContent = 'Upload Error: ' + err.message;
  }
});

// Fetch financial analysis results and display them
async function fetchAnalysis() {
  const status = document.getElementById('status');
  status.textContent = ''; // Clear previous status messages

  try {
    // Request analysis data from backend
    const res = await fetch('http://localhost:3000/analyze');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Analysis failed');

    const results = document.getElementById('results');
    
    // Format and display results for each company
    results.innerHTML = '<h3>Analysis Results</h3>' + data.map(d => `
      <div>
        <strong>${d.company}</strong><br/>
        Performance: ${d.performance}<br/>
        Current Ratio: ${d.currentRatio.toFixed(2)}<br/>
        Quick Ratio: ${d.quickRatio.toFixed(2)}<br/>
        Debt-to-Equity: ${d.debtToEquity.toFixed(2)}<br/>
        Interest Coverage: ${d.interestCoverage.toFixed(2)}<br/>
        Asset Turnover: ${d.assetTurnover.toFixed(2)}<br/>
        Inventory Turnover: ${d.inventoryTurnover.toFixed(2)}<br/>
        Return on Assets (ROA): ${d.returnOnAssets.toFixed(2)}<br/>
        Return on Equity (ROE): ${d.returnOnEquity.toFixed(2)}<br/><br/>
      </div>
    `).join('');

  } catch (err) {
    // Show error if analysis fails
    status.textContent = 'Analysis Error: ' + err.message;
  }
}
