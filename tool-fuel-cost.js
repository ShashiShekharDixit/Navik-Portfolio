/* Fuel Cost Calculator */

function calculateFuelCost() {
  const fuelType = document.getElementById('fuelType').value;
  const distance = parseFloat(document.getElementById('distance').value);
  const fuelRate  = parseFloat(document.getElementById('fuelRate').value);
  const mileage   = parseFloat(document.getElementById('mileage').value);

  // Require all fields
  if (isNaN(distance) || isNaN(fuelRate) || isNaN(mileage)) {
    alert('Please fill all fields');
    return;
  }

  // Reject non-positive values to prevent negative costs and division by zero
  if (distance <= 0) {
    alert('Distance must be greater than 0');
    return;
  }
  if (fuelRate <= 0) {
    alert('Fuel rate must be greater than 0');
    return;
  }
  if (mileage <= 0) {
    alert('Mileage must be greater than 0');
    return;
  }

  // Calculate fuel required — mileage > 0 is guaranteed above
  const fuelRequired   = distance / mileage;
  const actualFuelCost = fuelRequired * fuelRate;

  // Display results
  document.getElementById('fuelResult').style.display      = 'block';
  document.getElementById('fuelPlaceholder').style.display = 'none';

  document.getElementById('resultDistance').textContent  = distance.toFixed(2);
  document.getElementById('resultFuelType').textContent  = fuelType.charAt(0).toUpperCase() + fuelType.slice(1);
  document.getElementById('resultRate').textContent      = fuelRate.toFixed(2);
  document.getElementById('resultFuelLiters').textContent = fuelRequired.toFixed(2);
  document.getElementById('actualCost').textContent      = actualFuelCost.toFixed(2);

  // Scroll to results section smoothly
  setTimeout(() => {
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 150);
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', () => {
  const mileageInput = document.getElementById('mileage');
  if (mileageInput) {
    mileageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        calculateFuelCost();
      }
    });
  }
});
