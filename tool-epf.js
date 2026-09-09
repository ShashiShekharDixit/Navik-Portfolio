function calculateEPF() {
  const monthlySalary    = parseFloat(document.getElementById('monthlySalaryEPF').value) || 0;
  const yearsEPF         = parseFloat(document.getElementById('yearsEPF').value) || 0;

  // Read editable contribution and interest-rate inputs.
  // The HTML provides id="empContribution" (employee %), id="empCountribution" (employer %),
  // and id="interestRate" (annual %). Fall back to statutory defaults if the fields are absent.
  const empRateInput      = document.getElementById('empContribution');
  const empCountRateInput = document.getElementById('empCountribution');
  const interestRateInput = document.getElementById('interestRate');

  const empRate      = empRateInput      ? (parseFloat(empRateInput.value)      || 12)   : 12;
  const empCountRate = empCountRateInput ? (parseFloat(empCountRateInput.value)  || 12)   : 12;
  const interestRate = interestRateInput ? (parseFloat(interestRateInput.value)  || 8.15) : 8.15;

  // Validation
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

  // EPF Wage Ceiling: ₹15,000 per month (as per Jan 2024 norms)
  const wageCeiling    = 15000;
  const salaryForEPF   = Math.min(monthlySalary, wageCeiling);

  // Employee Contribution: uses the editable rate (default 12%)
  const empContribution = (salaryForEPF * empRate) / 100;

  // Employer Contribution breakdown (total uses the editable employer rate):
  // The statutory split is EPS 8.33% and EPF 3.67% of the ceiling.
  // Scale the split proportionally if the employer rate differs from 12%.
  const epsShareOfTotal = 12 > 0 ? (8.33 / 12) : 0;
  const epfShareOfTotal = 12 > 0 ? (3.67 / 12) : 0;

  const empEPFContrib   = (salaryForEPF * empCountRate) / 100 * epfShareOfTotal;
  const empEPSContrib   = (salaryForEPF * empCountRate) / 100 * epsShareOfTotal;
  const empTotalContrib = empEPFContrib + empEPSContrib;   // = (salaryForEPF * empCountRate) / 100

  // Only the EPF portion (not EPS) accumulates with interest for maturity
  const totalMonthlyContrib = empContribution + empEPFContrib;
  const annualContrib       = totalMonthlyContrib * 12;

  // Calculate maturity using Future Value of Annuity formula
  const months             = yearsEPF * 12;
  const monthlyInterestRate = interestRate / 12 / 100;

  let maturityAmount = 0;
  if (months > 0 && monthlyInterestRate > 0) {
    maturityAmount = totalMonthlyContrib *
      (Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate;
  } else if (months > 0) {
    maturityAmount = totalMonthlyContrib * months;
  }

  // Display results
  document.getElementById('empMonthlyContrib').textContent       = Math.round(empContribution).toLocaleString('en-IN');
  document.getElementById('empEPFContrib').textContent           = Math.round(empEPFContrib).toLocaleString('en-IN');
  document.getElementById('empEPSContrib').textContent           = Math.round(empEPSContrib).toLocaleString('en-IN');
  document.getElementById('empCountMonthlyContrib').textContent  = Math.round(empTotalContrib).toLocaleString('en-IN');
  document.getElementById('totalMonthlyContrib').textContent     = Math.round(totalMonthlyContrib).toLocaleString('en-IN');
  document.getElementById('annualContrib').textContent           = Math.round(annualContrib).toLocaleString('en-IN');
  document.getElementById('maturityAmount').textContent          = Math.round(maturityAmount).toLocaleString('en-IN');

  // Show wage ceiling note if salary exceeds ceiling
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
  if (form) form.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); calculateEPF(); } });
});
