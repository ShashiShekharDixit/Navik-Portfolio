function calculateGratuity() {
  const lastSalary = parseFloat(document.getElementById('lastSalary').value) || 0;
  const yearsOfService = parseFloat(document.getElementById('yearsOfService').value) || 0;
  const gratuityType = document.getElementById('gratuityType').value;
  
  // Validation
  if (lastSalary < 0 || yearsOfService < 0) {
    alert('Please enter valid values');
    return;
  }
  
  let gratuityAmount = 0;
  let formula = '';
  let basisAmount = 0;
  let warning = '';
  
  // Gratuity eligibility rules per Payment of Gratuity Act
  if (gratuityType === 'normal') {
    // Normal Resignation/Retirement: Requires 5+ years service for full gratuity
    if (yearsOfService < 1) {
      alert('Gratuity is not payable for service less than 1 year in normal cases.');
      return;
    }
    if (yearsOfService < 5) {
      warning = '<strong>Note:</strong> In normal resignation, gratuity is payable only after 5 years of continuous service. Gratuity shown below is for informational purposes only if full 5 years are completed.';
    }
    basisAmount = (lastSalary / 30) * 15; // 15 days average salary
    gratuityAmount = basisAmount * yearsOfService;
    formula = '(15 days of salary × Last Drawn Salary) × Years of Service';
  } else if (gratuityType === 'disability') {
    // Disability: 5 years service required, but calculated per 6 months served
    if (yearsOfService < 0.5) {
      alert('Gratuity requires minimum 6 months service for disability cases.');
      return;
    }
    basisAmount = (lastSalary / 30) * 15;
    gratuityAmount = basisAmount * yearsOfService;
    formula = '(15 days of salary × Last Drawn Salary) × Years of Service';
  } else if (gratuityType === 'death') {
    // Death: No minimum service period required
    if (yearsOfService === 0) {
      warning = '<strong>Note:</strong> Gratuity for death benefit may be payable even if less than 6 months of service, subject to employer policy.';
    }
    basisAmount = (lastSalary / 30) * 15;
    gratuityAmount = basisAmount * yearsOfService;
    formula = '(15 days of salary × Last Drawn Salary) × Years of Service';
  }
  
  // Apply maximum limit: ₹20 lakhs (₹2,000,000)
  const maxGratuity = 2000000;
  const limitApplied = gratuityAmount > maxGratuity;
  gratuityAmount = Math.min(gratuityAmount, maxGratuity);
  
  document.getElementById('gratuityFormula').textContent = formula;
  document.getElementById('calcBasis').textContent = Math.round(basisAmount).toLocaleString('en-IN');
  document.getElementById('gratuityAmount').textContent = Math.round(gratuityAmount).toLocaleString('en-IN');
  
  // Show limit warning if applied
  if (limitApplied) {
    document.getElementById('maxLimitNote').style.display = 'block';
  } else {
    document.getElementById('maxLimitNote').style.display = 'none';
  }
  
  // Show other warnings
  if (warning) {
    document.getElementById('gratuityWarning').innerHTML = warning;
    document.getElementById('gratuityWarning').style.display = 'block';
  } else {
    document.getElementById('gratuityWarning').style.display = 'none';
  }
  
  document.getElementById('gratuityResult').style.display = 'block';
  document.getElementById('gratuityPlaceholder').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('gratuityForm');
  if (form) form.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); calculateGratuity(); } });
});
