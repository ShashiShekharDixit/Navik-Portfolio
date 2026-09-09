function calculateLeaves() {
  const allocatedLeaves = parseFloat(document.getElementById('allocatedLeaves').value) || 0;
  const leavesTaken     = parseFloat(document.getElementById('leavesTaken').value)     || 0;
  const carryover       = parseFloat(document.getElementById('carryover').value)       || 0;

  // Read maxCarryover — do NOT substitute a default of 10 when the field is 0.
  // An explicit 0 means no carryover is allowed; an empty/missing field defaults to 0.
  const maxCarryoverInput = document.getElementById('maxCarryover');
  // Parse as float; treat empty string as 0 (not 10).
  const rawMaxCarryover   = maxCarryoverInput ? maxCarryoverInput.value.trim() : '';
  const maxCarryover      = rawMaxCarryover !== '' ? parseFloat(rawMaxCarryover) : 0;

  // Validation — reject negative values
  if (allocatedLeaves < 0 || leavesTaken < 0 || carryover < 0 || maxCarryover < 0) {
    alert('Please enter valid leave values');
    return;
  }

  if (leavesTaken > allocatedLeaves + carryover) {
    alert('Leaves taken cannot exceed available leaves. Please verify your input.');
    return;
  }

  // Preserve fractional leave values — do NOT round intermediate calculations.
  const totalAvailable    = allocatedLeaves + carryover;
  const remainingLeaves   = totalAvailable - leavesTaken;

  // When maxCarryover is 0 no days carry forward, regardless of remaining balance.
  const eligibleCarryover = Math.min(remainingLeaves, maxCarryover);
  const forfeitedLeaves   = Math.max(0, remainingLeaves - maxCarryover);

  // Earned Leave Calculation per Factories Act
  // Standard: 1 day per 20 days worked = 12 days per 240 working days in a year
  const workingDaysInYear        = 240;
  const totalEarnedLeaveInYear   = Math.round((workingDaysInYear / 20));  // = 12

  // Display — keep one decimal place so fractional values are visible
  function fmt(n) {
    // Show integers without decimals, fractional values with up to 1 decimal
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  }

  document.getElementById('totalAvailable').textContent        = fmt(totalAvailable);
  document.getElementById('displayLeavesTaken').textContent    = fmt(leavesTaken);
  document.getElementById('remainingLeaves').textContent       = fmt(remainingLeaves);
  document.getElementById('eligibleCarryover').textContent     = fmt(eligibleCarryover);
  document.getElementById('forfeitedLeaves').textContent       = fmt(forfeitedLeaves);
  document.getElementById('earnedLeaveStandard').textContent   = totalEarnedLeaveInYear;

  document.getElementById('leaveResult').style.display      = 'block';
  document.getElementById('leavePlaceholder').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leaveForm');
  if (form) form.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); calculateLeaves(); } });
});
