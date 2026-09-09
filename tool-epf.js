/* ─── helper: parse a number input, returning null when the field is
   absent or contains only whitespace so the caller can distinguish
   "user left it blank" from "user typed 0". ─────────────────────── */
function readNumericInput(id) {
  const el = document.getElementById(id);
  if (!el) return null;               // field does not exist on this page
  const raw = el.value.trim();
  if (raw === '') return null;        // field is present but empty
  const n = parseFloat(raw);
  return isNaN(n) ? null : n;        // unparseable → treat as absent
}

function calculateEPF() {
  const monthlySalary = readNumericInput('monthlySalaryEPF') ?? 0;
  const yearsEPF      = readNumericInput('yearsEPF')         ?? 0;

  // Read editable contribution and interest-rate inputs.
  // null → field absent/empty → use statutory default.
  // 0    → user explicitly typed 0 → use 0 (no substitution).
  const empRateRaw      = readNumericInput('empContribution');
  const empCountRateRaw = readNumericInput('empCountribution');
  const interestRateRaw = readNumericInput('interestRate');

  const empRate      = empRateRaw      !== null ? empRateRaw      : 12;
  const empCountRate = empCountRateRaw !== null ? empCountRateRaw : 12;
  const interestRate = interestRateRaw !== null ? interestRateRaw : 8.15;

  // ── Validation ───────────────────────────────────────────────────
  if (monthlySalary < 0 || yearsEPF < 0) {
    alert('Please enter valid values');
    return;
  }
  if (empRate < 0 || empRate > 100) {
    alert('Employee contribution rate must be between 0 and 100%');
    return;
  }
  if (empCountRate < 0 || empCountRate > 100) {
    alert('Employer contribution rate must be between 0 and 100%');
    return;
  }
  if (interestRate < 0 || interestRate > 30) {
    alert('Interest rate must be between 0 and 30%');
    return;
  }
  if (yearsEPF < 0.25) {
    alert('EPF contributions are valid after 3 months of service. Minimum withdrawals are restricted.');
    return;
  }

  // ── EPF Wage Ceiling: ₹15,000/month (Jan 2024 norms) ────────────
  const wageCeiling  = 15000;
  const salaryForEPF = Math.min(monthlySalary, wageCeiling);

  // Employee contribution at the user-supplied rate
  const empContribution = (salaryForEPF * empRate) / 100;

  // Employer contribution — statutory split: EPF 3.67%, EPS 8.33% of total 12%.
  // Scale proportionally when the employer rate differs from 12%.
  const baseRate        = 12;
  const epfFraction     = baseRate > 0 ? 3.67 / baseRate : 0;
  const epsFraction     = baseRate > 0 ? 8.33 / baseRate : 0;

  const empEPFContrib   = (salaryForEPF * empCountRate) / 100 * epfFraction;
  const empEPSContrib   = (salaryForEPF * empCountRate) / 100 * epsFraction;
  const empTotalContrib = empEPFContrib + empEPSContrib;

  // Only the EPF portion (not EPS) accumulates with interest for maturity
  const totalMonthlyContrib = empContribution + empEPFContrib;
  const annualContrib       = totalMonthlyContrib * 12;

  // ── Maturity — Future Value of Annuity ───────────────────────────
  const months              = yearsEPF * 12;
  const monthlyInterestRate = interestRate / 12 / 100;

  let maturityAmount = 0;
  if (months > 0 && monthlyInterestRate > 0) {
    maturityAmount = totalMonthlyContrib *
      (Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate;
  } else if (months > 0) {
    // Zero interest rate — simple sum
    maturityAmount = totalMonthlyContrib * months;
  }

  // ── Display ──────────────────────────────────────────────────────
  document.getElementById('empMonthlyContrib').textContent      = Math.round(empContribution).toLocaleString('en-IN');
  document.getElementById('empEPFContrib').textContent          = Math.round(empEPFContrib).toLocaleString('en-IN');
  document.getElementById('empEPSContrib').textContent          = Math.round(empEPSContrib).toLocaleString('en-IN');
  document.getElementById('empCountMonthlyContrib').textContent = Math.round(empTotalContrib).toLocaleString('en-IN');
  document.getElementById('totalMonthlyContrib').textContent    = Math.round(totalMonthlyContrib).toLocaleString('en-IN');
  document.getElementById('annualContrib').textContent          = Math.round(annualContrib).toLocaleString('en-IN');
  document.getElementById('maturityAmount').textContent         = Math.round(maturityAmount).toLocaleString('en-IN');

  if (monthlySalary > wageCeiling) {
    document.getElementById('wageNoteage').innerHTML =
      `<strong>Note:</strong> EPF is calculated on ₹${wageCeiling.toLocaleString('en-IN')} ceiling ` +
      `(salary ₹${monthlySalary.toLocaleString('en-IN')} exceeds limit).`;
    document.getElementById('wageCeilingNote').style.display = 'block';
  } else {
    document.getElementById('wageCeilingNote').style.display = 'none';
  }

  document.getElementById('epfResult').style.display      = 'block';
  document.getElementById('epfPlaceholder').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('epfForm');
  if (form) {
    form.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); calculateEPF(); }
    });
  }
});
