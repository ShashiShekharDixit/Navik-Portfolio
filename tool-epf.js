function calculateEPF() {
  const monthlySalary = parseFloat(document.getElementById('monthlySalaryEPF').value) || 0;
  const yearsEPF = parseFloat(document.getElementById('yearsEPF').value) || 0;
  
  // Validation
  if (monthlySalary < 0 || yearsEPF < 0) {
    alert('Please enter valid values');
    return;
  }
  
  if (yearsEPF < 0.25) {
    alert('EPF contributions are valid after 3 months of service. Minimum withdrawals are restricted.');
    return;
  }
  
  // EPF Wage Ceiling: ₹15,000 per month (as per Jan 2024 norms)
  const wageCeiling = 15000;
  const salaryForEPF = Math.min(monthlySalary, wageCeiling);
  
  // Employee Contribution: 12% of salary (up to ₹15,000 ceiling)
  const empContribution = (salaryForEPF * 12) / 100;
  
  // Employer Contribution breakdown (total 12% of salary):
  // - EPF: 8.33%
  // - EPS (Employer Pension Scheme): 3.67%
  const empEPFContrib = (salaryForEPF * 8.33) / 100;
  const empEPSContrib = (salaryForEPF * 3.67) / 100;
  const empTotalContrib = empEPFContrib + empEPSContrib;
  
  const totalMonthlyContrib = empContribution + empEPFContrib;
  const annualContrib = totalMonthlyContrib * 12;
  
  // FY 2024-25 Interest Rate: 8.15% (varies annually)
  const interestRate = 8.15;
  
  // Calculate maturity using Future Value of Annuity formula
  const months = yearsEPF * 12;
  const monthlyInterestRate = interestRate / 12 / 100;
  
  let maturityAmount = 0;
  if (months > 0 && monthlyInterestRate > 0) {
    maturityAmount = totalMonthlyContrib * (Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate;
  } else if (months > 0) {
    maturityAmount = totalMonthlyContrib * months;
  }
  
  // Display Employee Contribution
  document.getElementById('empMonthlyContrib').textContent = Math.round(empContribution).toLocaleString('en-IN');
  
  // Display Employer EPF & EPS Separately
  document.getElementById('empEPFContrib').textContent = Math.round(empEPFContrib).toLocaleString('en-IN');
  document.getElementById('empEPSContrib').textContent = Math.round(empEPSContrib).toLocaleString('en-IN');
  document.getElementById('empCountMonthlyContrib').textContent = Math.round(empTotalContrib).toLocaleString('en-IN');
  
  document.getElementById('totalMonthlyContrib').textContent = Math.round(totalMonthlyContrib).toLocaleString('en-IN');
  document.getElementById('annualContrib').textContent = Math.round(annualContrib).toLocaleString('en-IN');
  document.getElementById('maturityAmount').textContent = Math.round(maturityAmount).toLocaleString('en-IN');
  
  // Show wage ceiling note if salary exceeds ceiling
  if (monthlySalary > wageCeiling) {
    document.getElementById('wageNoteage').innerHTML = `<strong>Note:</strong> EPF is calculated on ₹${wageCeiling.toLocaleString('en-IN')} ceiling (salary ₹${monthlySalary.toLocaleString('en-IN')} exceeds limit).`;
    document.getElementById('wageCeilingNote').style.display = 'block';
  } else {
    document.getElementById('wageCeilingNote').style.display = 'none';
  }
  
  document.getElementById('epfResult').style.display = 'block';
  document.getElementById('epfPlaceholder').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('epfForm');
  if (form) form.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); calculateEPF(); } });
});
