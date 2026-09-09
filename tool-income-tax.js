function calculateTax() {
  const annualIncome   = parseFloat(document.getElementById('annualIncome').value) || 0;
  const taxRegime      = document.getElementById('taxRegime').value;
  const stdDeduction   = parseFloat(document.getElementById('stdDeduction').value)  || 0;
  const otherDeductions = parseFloat(document.getElementById('otherDeductions').value) || 0;

  // Validation — reject negative income
  if (annualIncome < 0) {
    alert('Please enter a valid income');
    return;
  }

  const totalDeductions = stdDeduction + otherDeductions;
  const taxableIncome   = Math.max(0, annualIncome - totalDeductions);
  let incomeTax = 0;

  // FY 2024-25 Tax Slabs
  if (taxRegime === 'new') {
    // New Tax Regime (Budget 2023, applicable FY 2024-25)
    if      (taxableIncome <= 300000)  incomeTax = 0;
    else if (taxableIncome <= 600000)  incomeTax = (taxableIncome - 300000) * 0.05;
    else if (taxableIncome <= 900000)  incomeTax = 15000  + (taxableIncome - 600000)  * 0.10;
    else if (taxableIncome <= 1200000) incomeTax = 45000  + (taxableIncome - 900000)  * 0.15;
    else if (taxableIncome <= 1500000) incomeTax = 90000  + (taxableIncome - 1200000) * 0.20;
    else                               incomeTax = 150000 + (taxableIncome - 1500000) * 0.30;
  } else {
    // Old Tax Regime (FY 2024-25, being phased out)
    if      (taxableIncome <= 250000)  incomeTax = 0;
    else if (taxableIncome <= 500000)  incomeTax = (taxableIncome - 250000) * 0.05;
    else if (taxableIncome <= 1000000) incomeTax = 12500  + (taxableIncome - 500000)  * 0.20;
    else                               incomeTax = 112500 + (taxableIncome - 1000000) * 0.30;
  }

  // Rebate u/s 87A
  let rebate = 0;
  if (taxableIncome <= 500000) {
    // Full relief for both regimes when taxable income ≤ ₹5 lakhs
    rebate    = incomeTax;
    incomeTax = 0;
  } else if (taxRegime === 'new' && taxableIncome <= 700000) {
    // Limited rebate for new regime up to ₹7 lakhs (max ₹25,000)
    rebate    = Math.min(incomeTax, 25000);
    incomeTax = Math.max(0, incomeTax - rebate);
  }

  // Surcharge (applicable when income exceeds ₹50 lakhs)
  let surcharge = 0;
  if      (annualIncome >= 5000000  && annualIncome < 10000000) surcharge = incomeTax * 0.15;
  else if (annualIncome >= 10000000 && annualIncome < 20000000) surcharge = incomeTax * 0.25;
  else if (annualIncome >= 20000000)                            surcharge = incomeTax * 0.37;

  // Health and Education Cess: 4% on (income tax + surcharge)
  const cess     = (incomeTax + surcharge) * 0.04;
  const totalTax = incomeTax + surcharge + cess;

  // Effective rate — guard against division by zero when income is 0
  const effectiveRate = annualIncome > 0
    ? ((totalTax / annualIncome) * 100).toFixed(2) + '%'
    : '0.00%';

  // Display results
  document.getElementById('taxGrossIncome').textContent  = Math.round(annualIncome).toLocaleString('en-IN');
  document.getElementById('taxTotalDed').textContent     = Math.round(totalDeductions).toLocaleString('en-IN');
  document.getElementById('taxableIncome').textContent   = Math.round(taxableIncome).toLocaleString('en-IN');
  document.getElementById('incomeTaxPayable').textContent = Math.round(incomeTax).toLocaleString('en-IN');

  // Show rebate row if applied
  if (rebate > 0) {
    document.getElementById('rebateRow').style.display   = 'flex';
    document.getElementById('rebateAmount').textContent  = Math.round(rebate).toLocaleString('en-IN');
  } else {
    document.getElementById('rebateRow').style.display   = 'none';
  }

  // Show surcharge row if applicable
  if (surcharge > 0) {
    document.getElementById('surchargeRow').style.display   = 'flex';
    document.getElementById('surchargeAmount').textContent  = Math.round(surcharge).toLocaleString('en-IN');
  } else {
    document.getElementById('surchargeRow').style.display   = 'none';
  }

  document.getElementById('cess').textContent         = Math.round(cess).toLocaleString('en-IN');
  document.getElementById('totalTax').textContent     = Math.round(totalTax).toLocaleString('en-IN');
  document.getElementById('effectiveRate').textContent = effectiveRate;

  // Regime note
  document.getElementById('regimeNoteOld').style.display = taxRegime === 'old' ? 'block' : 'none';

  document.getElementById('taxResult').style.display      = 'block';
  document.getElementById('taxPlaceholder').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('taxForm');
  if (form) form.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); calculateTax(); } });
});
