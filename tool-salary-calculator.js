/* ═══════════════════════════════════════════
   SALARY CALCULATOR — Logic
═══════════════════════════════════════════ */

function calculateSalary() {
  const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
  const hra = parseFloat(document.getElementById('hra').value) || 0;
  const da = parseFloat(document.getElementById('da').value) || 0;
  const otherAllowance = parseFloat(document.getElementById('otherAllowance').value) || 0;
  const deductions = parseFloat(document.getElementById('deductions').value) || 0;

  // Validation
  if (basicSalary < 0 || hra < 0 || da < 0 || otherAllowance < 0 || deductions < 0) {
    alert('Please enter valid salary amounts (no negative values)');
    return;
  }

  const grossSalary = basicSalary + hra + da + otherAllowance;
  
  // Validate deductions don't exceed gross salary
  if (deductions > grossSalary) {
    alert('Total deductions cannot exceed gross salary. Please verify your input.');
    return;
  }
  
  const netSalary = grossSalary - deductions;
  
  // CTC Calculation (Cost to Company includes):
  // Monthly Gross + Employer contributions (assuming standard rates)
  // Employer EPF: 8.33% of basic (capped at ₹15,000/month from Jan 2024)
  const epfWageCeiling = 15000;
  const salaryForEPF = Math.min(basicSalary, epfWageCeiling);
  const empEPFContrib = (salaryForEPF * 8.33) / 100;
  
  // Assumed employer ESI (If applicable for salary ≤ ₹21,000): 3.25%
  let empESIContrib = 0;
  if (basicSalary <= 21000) {
    empESIContrib = (basicSalary * 3.25) / 100;
  }
  
  const monthlyCTC = grossSalary + empEPFContrib + empESIContrib;
  const annualCTC = monthlyCTC * 12;

  // Format and display results
  document.getElementById('grossSalary').textContent = Math.round(grossSalary).toLocaleString('en-IN');
  document.getElementById('totalDeductions').textContent = Math.round(deductions).toLocaleString('en-IN');
  document.getElementById('netSalary').textContent = Math.round(netSalary).toLocaleString('en-IN');
  document.getElementById('monthlyCTC').textContent = Math.round(monthlyCTC).toLocaleString('en-IN');
  document.getElementById('annualCTC').textContent = Math.round(annualCTC).toLocaleString('en-IN');
  
  // Show CTC breakdown note
  document.getElementById('ctcBreakdownNote').innerHTML = `<strong>CTC Breakdown:</strong> Monthly Gross (₹${Math.round(grossSalary).toLocaleString('en-IN')}) + Employer EPF (₹${Math.round(empEPFContrib).toLocaleString('en-IN')}) + Employer ESI (₹${Math.round(empESIContrib).toLocaleString('en-IN')})`;
  document.getElementById('ctcBreakdownNote').style.display = empEPFContrib > 0 || empESIContrib > 0 ? 'block' : 'none';

  // Show results section
  document.getElementById('salaryResult').style.display = 'block';
  document.getElementById('salaryPlaceholder').style.display = 'none';
}

// Support Enter key
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('salaryForm');
  if (form) {
    form.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        calculateSalary();
      }
    });
  }
});
