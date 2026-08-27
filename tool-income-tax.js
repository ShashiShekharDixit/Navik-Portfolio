function calculateTax() {
  const annualIncome = parseFloat(document.getElementById('annualIncome').value) || 0;
  const taxRegime = document.getElementById('taxRegime').value;
  const stdDeduction = parseFloat(document.getElementById('stdDeduction').value) || 0;
  const otherDeductions = parseFloat(document.getElementById('otherDeductions').value) || 0;
  
  // Validation
  if (annualIncome < 0) {
    alert('Please enter a valid income');
    return;
  }
  
  const totalDeductions = stdDeduction + otherDeductions;
  const taxableIncome = Math.max(0, annualIncome - totalDeductions);
  let incomeTax = 0;
  
  // FY 2024-25 Tax Slabs
  if (taxRegime === 'new') {
    // New Tax Regime
    if (taxableIncome <= 300000) incomeTax = 0;
    else if (taxableIncome <= 600000) incomeTax = (taxableIncome - 300000) * 0.05;
    else if (taxableIncome <= 900000) incomeTax = 15000 + (taxableIncome - 600000) * 0.1;
    else if (taxableIncome <= 1200000) incomeTax = 45000 + (taxableIncome - 900000) * 0.15;
    else if (taxableIncome <= 1500000) incomeTax = 90000 + (taxableIncome - 1200000) * 0.2;
    else incomeTax = 150000 + (taxableIncome - 1500000) * 0.3;
  } else {
    // Old Tax Regime (Being Phased Out)
    if (taxableIncome <= 250000) incomeTax = 0;
    else if (taxableIncome <= 500000) incomeTax = (taxableIncome - 250000) * 0.05;
    else if (taxableIncome <= 1000000) incomeTax = 12500 + (taxableIncome - 500000) * 0.2;
    else incomeTax = 112500 + (taxableIncome - 1000000) * 0.3;
  }
  
  // Rebate u/s 87A (Applicable for both regimes)
  // Standard rebate: Full tax relief if taxable income ≤ ₹5 lakhs (≤ ₹5,00,000)
  let rebate = 0;
  if (taxableIncome <= 500000) {
    rebate = incomeTax;
    incomeTax = 0;
  } else if (taxRegime === 'new' && taxableIncome <= 700000) {
    // Additional: Limited rebate for new regime up to ₹7 lakhs
    rebate = Math.min(incomeTax, 25000);
    incomeTax = Math.max(0, incomeTax - rebate);
  }
  
  // Surcharge (Applicable when income exceeds ₹50 lakhs)
  let surcharge = 0;
  if (annualIncome >= 5000000 && annualIncome < 10000000) {
    surcharge = incomeTax * 0.15;
  } else if (annualIncome >= 10000000 && annualIncome < 20000000) {
    surcharge = incomeTax * 0.25;
  } else if (annualIncome >= 20000000) {
    surcharge = incomeTax * 0.37;
  }
  
  // Cess (4% on total income tax + surcharge)
  const cess = (incomeTax + surcharge) * 0.04;
  
  const totalTax = incomeTax + surcharge + cess;
  const effectiveRate = (totalTax / annualIncome * 100).toFixed(2);
  
  // Display results
  document.getElementById('taxGrossIncome').textContent = Math.round(annualIncome).toLocaleString('en-IN');
  document.getElementById('taxTotalDed').textContent = Math.round(totalDeductions).toLocaleString('en-IN');
  document.getElementById('taxableIncome').textContent = Math.round(taxableIncome).toLocaleString('en-IN');
  document.getElementById('incomeTaxPayable').textContent = Math.round(incomeTax).toLocaleString('en-IN');
  
  // Show rebate if applied
  if (rebate > 0) {
    document.getElementById('rebateRow').style.display = 'flex';
    document.getElementById('rebateAmount').textContent = Math.round(rebate).toLocaleString('en-IN');
  } else {
    document.getElementById('rebateRow').style.display = 'none';
  }
  
  // Show surcharge if applicable
  if (surcharge > 0) {
    document.getElementById('surchargeRow').style.display = 'flex';
    document.getElementById('surchargeAmount').textContent = Math.round(surcharge).toLocaleString('en-IN');
  } else {
    document.getElementById('surchargeRow').style.display = 'none';
  }
  
  document.getElementById('cess').textContent = Math.round(cess).toLocaleString('en-IN');
  document.getElementById('totalTax').textContent = Math.round(totalTax).toLocaleString('en-IN');
  document.getElementById('effectiveRate').textContent = effectiveRate + '%';
  
  // Show regime note
  if (taxRegime === 'old') {
    document.getElementById('regimeNoteOld').style.display = 'block';
  } else {
    document.getElementById('regimeNoteOld').style.display = 'none';
  }
  
  document.getElementById('taxResult').style.display = 'block';
  document.getElementById('taxPlaceholder').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('taxForm');
  if (form) form.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); calculateTax(); } });
});
