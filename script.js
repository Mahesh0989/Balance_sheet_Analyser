
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const status = document.getElementById('status');
    status.textContent = '';
  
    const file = document.getElementById('fileInput').files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      status.style.color = 'green';
      status.textContent = data.message;
    } catch (err) {
      status.textContent = 'Upload Error: ' + err.message;
    }
  });
  
  async function fetchAnalysis() {
    const status = document.getElementById('status');
    status.textContent = '';
  
    try {
      const res = await fetch('http://localhost:3000/analyze');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');
  
      const results = document.getElementById('results');
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
        </div>`).join('');
    } catch (err) {
      status.textContent = 'Analysis Error: ' + err.message;
    }
  }
  