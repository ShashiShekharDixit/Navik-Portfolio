/*
 * Income Tax Calculator — FY 2024-25 (AY 2025-26)
 *
 * New regime slabs: Finance Act 2024 (Budget 2024, effective 1 Apr 2024)
 *   Up to ₹3,00,000          →  Nil
 *   ₹3,00,001 – ₹7,00,000   →  5%
 *   ₹7,00,001 – ₹10,00,000  → 10%
 *   ₹10,00,001 – ₹12,00,000 → 15%
 *   ₹12,00,001 – ₹15,00,000 → 20%
 *   Above ₹15,00,000         → 30%
 *
 * Old regime slabs: unchanged for FY 2024-25
 *   Up to ₹2,50,000          →  Nil
 *   ₹2,50,001 – ₹5,00,000   →  5%
 *   ₹5,00,001 – ₹10,00,000  → 20%
 *   Above ₹10,00,000         → 30%
 *
 * Rebate u/s 87A
 *   New regime: full rebate (up to ₹25,000) when taxable income ≤ ₹7,00,000
 *   Old regime: full rebate (up to ₹12,500) when taxable income ≤ ₹5,00,000
 *
 * Standard deduction (new regime, Budget 2024): ₹75,000 for salaried/pensioners
 * Standard deduction (old regime): ₹50,000
 * Note: the HTML inputs allow the user to enter their own deduction values, so
 * no deduction is hardcoded here — the calculation uses whatever the user enters.
 *
 * Verified test case:
 *   Income ₹8,75,000, std deduction ₹75,000 → taxable ₹8,00,000
 *   New regime: 0 + 5%×4L + 10%×1L = 20,000 + 10,000 = 30,000
 *   Cess 4%: 1,200 → total ₹31,200  ✓
 */

function calculateTax() {
  const annualIncome    = parseFloat(document.getElementById('annualIncome').value)    || 0;
  const taxRegime       = document.getElementById('taxRegime').value;
  const stdDeduction    = parseFloat(document.getElementById('stdDeduction').value)    || 0;
  const otherDeductions = parseFloat(document.getElementById('otherDeductions').value) || 0;

  // Reject negative income
  if (annualIncome < 0) {
    alert('Please enter a valid income');
    return;
  }

  const totalDeductions = stdDeduction + otherDeductions;
  const taxableIncome   = Math.max(0, annualIncome - totalDeductions);
  let incomeTax = 0;

  if (taxRegime === 'new') {
    // ── New Regime — Finance Act 2024 (Budget 2024, FY 2024-25) ────
    if      (taxableIncome <= 300000)  incomeTax = 0;
    else if (taxableIncome <= 700000)  incomeTax =                         (taxableIncome - 300000) * 0.05;
    else if (taxableIncome <= 1000000) incomeTax = 20000 +                 (taxableIncome - 700000) * 0.10;
    else if (taxableIncome <= 1200000) incomeTax = 50000 +                 (taxableIncome - 1000000) * 0.15;
    else if (taxableIncome <= 1500000) incomeTax = 80000 +                 (taxableIncome - 1200000) * 0.20;
    else                               incomeTax = 140000 +                (taxableIncome - 1500000) * 0.30;
  } else {
    // ── Old Regime — unchanged FY 2024-25 ──────────────────────────
    if      (taxableIncome <= 250000)  incomeTax = 0;
    else if (taxableIncome <= 500000)  incomeTax =           (taxableIncome - 250000)  * 0.05;
    else if (taxableIncome <= 1000000) incomeTax = 12500  + (taxableIncome - 500000)  * 0.20;
    else                               incomeTax = 112500 + (taxableIncome - 1000000) * 0.30;
  }

  // ── Rebate u/s 87A ───────────────────────────────────────────────
  let rebate = 0;
  if (taxRegime === 'new') {
    // New regime: full rebate up to ₹25,000 when taxable income ≤ ₹7,00,000
    if (taxableIncome <= 700000) {
      rebate    = Math.min(incomeTax, 25000);
      incomeTax = Math.max(0, incomeTax - rebate);
    }
  } else {
    // Old regime: full rebate up to ₹12,500 when taxable income ≤ ₹5,00,000
    if (taxableIncome <= 500000) {
      rebate    = Math.min(incomeTax, 12500);
      incomeTax = Math.max(0, incomeTax - rebate);
    }
  }

  // ── Surcharge (on income, not taxable income) ────────────────────
  // New regime: marginal relief cap at 25% for income 2–5 cr
  let surcharge = 0;
  if      (annualIncome >= 5000000  && annualIncome < 10000000) surcharge = incomeTax * 0.10;
  else if (annualIncome >= 10000000 && annualIncome < 20000000) surcharge = incomeTax * 0.15;
  else if (annualIncome >= 20000000 && annualIncome < 50000000) surcharge = incomeTax * 0.25;
  else if (annualIncome >= 50000000)                            surcharge = incomeTax * (taxRegime === 'new' ? 0.25 : 0.37);

  // ── Health & Education Cess: 4% on (tax + surcharge) ────────────
  const cess     = (incomeTax + surcharge) * 0.04;
  const totalTax = incomeTax + surcharge + cess;

  // Effective rate — guard zero income
  const effectiveRate = annualIncome > 0
    ? ((totalTax / annualIncome) * 100).toFixed(2) + '%'
    : '0.00%';

  // ── Display ──────────────────────────────────────────────────────
  document.getElementById('taxGrossIncome').textContent   = Math.round(annualIncome).toLocaleString('en-IN');
  document.getElementById('taxTotalDed').textContent      = Math.round(totalDeductions).toLocaleString('en-IN');
  document.getElementById('taxableIncome').textContent    = Math.round(taxableIncome).toLocaleString('en-IN');
  document.getElementById('incomeTaxPayable').textContent = Math.round(incomeTax).toLocaleString('en-IN');

  if (rebate > 0) {
    document.getElementById('rebateRow').style.display  = 'flex';
    document.getElementById('rebateAmount').textContent = Math.round(rebate).toLocaleString('en-IN');
  } else {
    document.getElementById('rebateRow').style.display  = 'none';
  }

  if (surcharge > 0) {
    document.getElementById('surchargeRow').style.display   = 'flex';
    document.getElementById('surchargeAmount').textContent  = Math.round(surcharge).toLocaleString('en-IN');
  } else {
    document.getElementById('surchargeRow').style.display   = 'none';
  }

  document.getElementById('cess').textContent          = Math.round(cess).toLocaleString('en-IN');
  document.getElementById('totalTax').textContent      = Math.round(totalTax).toLocaleString('en-IN');
  document.getElementById('effectiveRate').textContent = effectiveRate;

  document.getElementById('regimeNoteOld').style.display = taxRegime === 'old' ? 'block' : 'none';

  document.getElementById('taxResult').style.display      = 'block';
  document.getElementById('taxPlaceholder').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('taxForm');
  if (form) {
    form.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); calculateTax(); }
    });
  }
});
