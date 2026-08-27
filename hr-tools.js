/* ═══════════════════════════════════════════
   HR TOOLS — Calculator Logic
═══════════════════════════════════════════ */

// ── SALARY CALCULATOR ──
function calculateSalary() {
  const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
  const hra = parseFloat(document.getElementById('hra').value) || 0;
  const da = parseFloat(document.getElementById('da').value) || 0;
  const otherAllowance = parseFloat(document.getElementById('otherAllowance').value) || 0;
  const deductions = parseFloat(document.getElementById('deductions').value) || 0;

  const grossSalary = basicSalary + hra + da + otherAllowance;
  const netSalary = grossSalary - deductions;
  const monthlyCTC = grossSalary;
  const annualCTC = monthlyCTC * 12;

  document.getElementById('grossSalary').textContent = Math.round(grossSalary).toLocaleString('en-IN');
  document.getElementById('totalDeductions').textContent = Math.round(deductions).toLocaleString('en-IN');
  document.getElementById('netSalary').textContent = Math.round(netSalary).toLocaleString('en-IN');
  document.getElementById('monthlyCTC').textContent = Math.round(monthlyCTC).toLocaleString('en-IN');
  document.getElementById('salaryResult').style.display = 'block';
}

// ── INCOME TAX CALCULATOR ──
function calculateTax() {
  const annualIncome = parseFloat(document.getElementById('annualIncome').value) || 0;
  const taxRegime = document.getElementById('taxRegime').value;
  const stdDeduction = parseFloat(document.getElementById('stdDeduction').value) || 0;
  const otherDeductions = parseFloat(document.getElementById('otherDeductions').value) || 0;
  const totalDeductions = stdDeduction + otherDeductions;
  const taxableIncome = Math.max(0, annualIncome - totalDeductions);
  let incomeTax = 0;

  if (taxRegime === 'new') {
    // New Tax Regime FY 2024-25
    if (taxableIncome <= 300000) {
      incomeTax = 0;
    } else if (taxableIncome <= 600000) {
      incomeTax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 900000) {
      incomeTax = 15000 + (taxableIncome - 600000) * 0.1;
    } else if (taxableIncome <= 1200000) {
      incomeTax = 45000 + (taxableIncome - 900000) * 0.15;
    } else if (taxableIncome <= 1500000) {
      incomeTax = 90000 + (taxableIncome - 1200000) * 0.2;
    } else {
      incomeTax = 150000 + (taxableIncome - 1500000) * 0.3;
    }
  } else {
    // Old Tax Regime
    if (taxableIncome <= 250000) {
      incomeTax = 0;
    } else if (taxableIncome <= 500000) {
      incomeTax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      incomeTax = 12500 + (taxableIncome - 500000) * 0.2;
    } else {
      incomeTax = 112500 + (taxableIncome - 1000000) * 0.3;
    }
  }

  const cess = incomeTax * 0.04;
  const totalTax = incomeTax + cess;
  document.getElementById('taxGrossIncome').textContent = Math.round(annualIncome).toLocaleString('en-IN');
  document.getElementById('taxTotalDed').textContent = Math.round(totalDeductions).toLocaleString('en-IN');
  document.getElementById('taxableIncome').textContent = Math.round(taxableIncome).toLocaleString('en-IN');
  document.getElementById('incomeTaxPayable').textContent = Math.round(incomeTax).toLocaleString('en-IN');
  document.getElementById('cess').textContent = Math.round(cess).toLocaleString('en-IN');
  document.getElementById('totalTax').textContent = Math.round(totalTax).toLocaleString('en-IN');
  document.getElementById('taxResult').style.display = 'block';
}

// ── GRATUITY CALCULATOR ──
function calculateGratuity() {
  const lastSalary = parseFloat(document.getElementById('lastSalary').value) || 0;
  const yearsOfService = parseFloat(document.getElementById('yearsOfService').value) || 0;
  const gratuityType = document.getElementById('gratuityType').value;
  let gratuityAmount = 0;
  let formula = '';
  let basisAmount = 0;
  if (gratuityType === 'normal' || gratuityType === 'disability') {
    // Standard: 15 days salary × Years of service
    // But minimum 1 year required
    if (yearsOfService >= 1) {
      basisAmount = (lastSalary / 30) * 15;
      gratuityAmount = basisAmount * yearsOfService;
      formula = '15 days × Last Salary × Years of Service';
    }
  } else if (gratuityType === 'death') {
    // Death: 15 days salary × Years of service (no minimum year requirement)
    basisAmount = (lastSalary / 30) * 15;
    gratuityAmount = basisAmount * yearsOfService;
    formula = '15 days × Last Salary × Years (Death - No Min Year)';
  }

  // Maximum limit: ₹20 lakhs
  gratuityAmount = Math.min(gratuityAmount, 2000000);
  document.getElementById('gratuityFormula').textContent = formula;
  document.getElementById('calcBasis').textContent = Math.round(basisAmount).toLocaleString('en-IN');
  document.getElementById('gratuityAmount').textContent = Math.round(gratuityAmount).toLocaleString('en-IN');
  document.getElementById('gratuityResult').style.display = 'block';
}

// ── LEAVE TRACKER ──
function calculateLeaves() {
  const allocatedLeaves = parseFloat(document.getElementById('allocatedLeaves').value) || 0;
  const leavesTaken = parseFloat(document.getElementById('leavesTaken').value) || 0;
  const carryover = parseFloat(document.getElementById('carryover').value) || 0;
  const maxCarryover = parseFloat(document.getElementById('maxCarryover').value) || 10;
  
  const totalAvailable = allocatedLeaves + carryover;
  const remainingLeaves = totalAvailable - leavesTaken;
  const eligibleCarryover = Math.min(remainingLeaves, maxCarryover);
  const forfeitedLeaves = Math.max(0, remainingLeaves - maxCarryover);

  document.getElementById('totalAvailable').textContent = Math.round(totalAvailable);
  document.getElementById('displayLeavesTaken').textContent = Math.round(leavesTaken);
  document.getElementById('remainingLeaves').textContent = Math.round(remainingLeaves);
  document.getElementById('eligibleCarryover').textContent = Math.round(eligibleCarryover);
  document.getElementById('forfeitedLeaves').textContent = Math.round(forfeitedLeaves);

  document.getElementById('leaveResult').style.display = 'block';
}

// ── EPF CALCULATOR ──
function calculateEPF() {
  const monthlySalary = parseFloat(document.getElementById('monthlySalaryEPF').value) || 0;
  const yearsEPF = parseFloat(document.getElementById('yearsEPF').value) || 0;
  const empContribution = parseFloat(document.getElementById('empContribution').value) || 12;
  const empCountContribution = parseFloat(document.getElementById('empCountribution').value) || 12;
  const interestRate = parseFloat(document.getElementById('interestRate').value) || 8.5;

  // Monthly contributions
  const empMonthlyContrib = (monthlySalary * empContribution) / 100;
  const empCountMonthlyContrib = (monthlySalary * empCountContribution) / 100;
  const totalMonthlyContrib = empMonthlyContrib + empCountMonthlyContrib;

  // Annual contribution
  const annualContrib = totalMonthlyContrib * 12;

  // Calculate maturity using compound interest formula
  // A = P(1 + r/100)^n
  const months = yearsEPF * 12;
  const monthlyInterestRate = interestRate / 12 / 100;
  const maturityAmount = totalMonthlyContrib * (Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate;

  document.getElementById('empMonthlyContrib').textContent = Math.round(empMonthlyContrib).toLocaleString('en-IN');
  document.getElementById('empCountMonthlyContrib').textContent = Math.round(empCountMonthlyContrib).toLocaleString('en-IN');
  document.getElementById('totalMonthlyContrib').textContent = Math.round(totalMonthlyContrib).toLocaleString('en-IN');
  document.getElementById('annualContrib').textContent = Math.round(annualContrib).toLocaleString('en-IN');
  document.getElementById('maturityAmount').textContent = Math.round(maturityAmount).toLocaleString('en-IN');

  document.getElementById('epfResult').style.display = 'block';
}

// ── ENTER KEY SUPPORT ──
document.addEventListener('DOMContentLoaded', () => {
  // Salary form
  document.getElementById('salaryForm')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateSalary();
  });

  // Tax form
  document.getElementById('taxForm')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateTax();
  });

  // Gratuity form
  document.getElementById('gratuityForm')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateGratuity();
  });

  // Leave form
  document.getElementById('leaveForm')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateLeaves();
  });

  // EPF form
  document.getElementById('epfForm')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateEPF();
  });
});
