function calculateLeaves() {
  const allocatedLeaves = parseFloat(document.getElementById('allocatedLeaves').value) || 0;
  const leavesTaken = parseFloat(document.getElementById('leavesTaken').value) || 0;
  const carryover = parseFloat(document.getElementById('carryover').value) || 0;
  const maxCarryover = parseFloat(document.getElementById('maxCarryover').value) || 10;
  
  // Validation
  if (allocatedLeaves < 0 || leavesTaken < 0 || carryover < 0) {
    alert('Please enter valid leave values');
    return;
  }
  
  if (leavesTaken > allocatedLeaves + carryover) {
    alert('Leaves taken cannot exceed available leaves. Please verify your input.');
    return;
  }
  
  const totalAvailable = allocatedLeaves + carryover;
  const remainingLeaves = totalAvailable - leavesTaken;
  const eligibleCarryover = Math.min(remainingLeaves, maxCarryover);
  const forfeitedLeaves = Math.max(0, remainingLeaves - maxCarryover);
  
  // Earned Leave Calculation per Factories Act
  // Standard: 1 day per 20 days worked = 12 days per 240 working days in a year
  // Assuming ~240 working days in a year (365 - 52 Sundays - ~10 holidays)
  const workingDaysInYear = 240;
  const earnedLeavePerDay = 1;
  const totalEarnedLeaveInYear = Math.round((workingDaysInYear / 20) * earnedLeavePerDay);
  
  document.getElementById('totalAvailable').textContent = Math.round(totalAvailable);
  document.getElementById('displayLeavesTaken').textContent = Math.round(leavesTaken);
  document.getElementById('remainingLeaves').textContent = Math.round(remainingLeaves);
  document.getElementById('eligibleCarryover').textContent = Math.round(eligibleCarryover);
  document.getElementById('forfeitedLeaves').textContent = Math.round(forfeitedLeaves);
  document.getElementById('earnedLeaveStandard').textContent = totalEarnedLeaveInYear;
  
  document.getElementById('leaveResult').style.display = 'block';
  document.getElementById('leavePlaceholder').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leaveForm');
  if (form) form.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); calculateLeaves(); } });
});
