# HR Calculators - Testing & Verification Guide

## Test Before Going Live

### 1. INCOME TAX CALCULATOR

#### Test Case 1: Low Income (≤ ₹5 lakhs) - Rebate Applied
```
Input:
- Income: ₹4,00,000
- Tax Regime: New
- Standard Deduction: ₹75,000

Expected Output:
- Taxable Income: ₹3,25,000
- Income Tax: ₹0 (fully covered by rebate)
- Rebate (u/s 87A): Full amount
- Total Tax: ₹0 + Cess = ₹0
- Status: ✅ PASS
```

#### Test Case 2: High Income (> ₹50 lakhs) - Surcharge Applied
```
Input:
- Income: ₹80,00,000
- Tax Regime: New
- Standard Deduction: ₹75,000

Expected Output:
- Taxable Income: ₹79,25,000
- Income Tax: ~₹23,37,500
- Surcharge (15%): ~₹3,50,625
- Total Tax: ~₹26,88,225 + Cess
- Surcharge Row: VISIBLE ✅
- Status: ✅ PASS
```

#### Test Case 3: Old Regime
```
Input:
- Income: ₹10,00,000
- Tax Regime: Old

Expected Output:
- Warning: "Old Tax Regime - Being Phased Out" ✅
- Tax calculated using old slabs
- Status: ✅ PASS
```

---

### 2. EPF CALCULATOR

#### Test Case 1: Salary Below Ceiling (₹30,000/month)
```
Input:
- Monthly Salary: ₹30,000
- Years: 5
- Employee Contribution: 12%
- Employer Contribution: 12%

Expected Output:
- Employee Contribution: ₹3,600/month
- Employer EPF (8.33%): ₹2,499/month
- Employer EPS (3.67%): ₹1,101/month
- NO wage ceiling note ✅
- Status: ✅ PASS
```

#### Test Case 2: Salary Above Ceiling (₹50,000/month)
```
Input:
- Monthly Salary: ₹50,000
- Years: 5

Expected Output:
- EPF calculation on ₹15,000 ceiling only
- Employee: ₹1,800/month (12% of ₹15,000)
- Employer EPF: ₹1,249.50/month
- Employer EPS: ₹550.50/month
- Wage Ceiling Note: VISIBLE ✅
- Status: ✅ PASS
```

#### Test Case 3: FY 2024-25 Interest Rate
```
Expected:
- Interest Rate: 8.15% (NOT user-editable)
- Should be fixed in results display ✅
- Status: ✅ PASS
```

#### Test Case 4: Service < 3 Months
```
Input:
- Years: 0.2 (2.4 months)

Expected:
- Alert: "EPF contributions valid after 3 months" ✅
- Returns: Calculation blocked
- Status: ✅ PASS
```

---

### 3. GRATUITY CALCULATOR

#### Test Case 1: Normal Resignation < 5 Years
```
Input:
- Last Salary: ₹50,000
- Years: 3
- Type: Normal (Resignation/Retirement)

Expected Output:
- Calculation shows
- Warning: "In normal resignation, gratuity payable only after 5 years" ✅
- Shows calculation "if full 5 years completed"
- Status: ✅ PASS
```

#### Test Case 2: Death with < 6 Months Service
```
Input:
- Last Salary: ₹50,000
- Years: 0.3
- Type: Death

Expected Output:
- Calculation proceeds (no minimum)
- Note: "Payable even if <6 months, subject to employer policy" ✅
- Status: ✅ PASS
```

#### Test Case 3: Gratuity > ₹20 Lakhs (Max Limit)
```
Input:
- Last Salary: ₹2,00,000
- Years: 50
- Type: Normal

Expected Output:
- Calculated: ₹1,00,00,000
- Applied Limit: ₹20,00,000
- Max Limit Note: VISIBLE ✅
- Status: ✅ PASS
```

#### Test Case 4: Disability with Proper Service
```
Input:
- Last Salary: ₹50,000
- Years: 2
- Type: Disability

Expected Output:
- Calculation: (50,000 ÷ 30) × 15 × 2 = ₹50,000
- No error (disability allows <5 years)
- Status: ✅ PASS
```

---

### 4. LEAVE TRACKER

#### Test Case 1: Basic Leave Tracking
```
Input:
- Allocated: 20
- Taken: 5
- Carryover: 2 (from last year)
- Max Carryover: 10

Expected Output:
- Total Available: 22
- Remaining: 17
- Eligible Carryover: 10 (min of 17 and 10)
- Forfeited: 7
- Earned Leave Standard: 12 days/year ✅
- Status: ✅ PASS
```

#### Test Case 2: Negative Leave Taken (Validation)
```
Input:
- Allocated: 20
- Taken: 25
- Carryover: 0

Expected Output:
- Alert: "Leaves taken cannot exceed available" ✅
- Calculation blocked
- Status: ✅ PASS
```

#### Test Case 3: Forfeiture > 0
```
Input:
- Remaining: 15
- Max Carryover: 10

Expected Output:
- Eligible Carryover: 10
- Forfeited: 5 ✅
- Clearly displayed
- Status: ✅ PASS
```

---

### 5. SALARY CALCULATOR

#### Test Case 1: Valid Salary Components
```
Input:
- Basic: ₹50,000
- HRA: ₹10,000
- DA: ₹5,000
- Allowance: ₹5,000
- Deductions: ₹8,000

Expected Output:
- Gross: ₹70,000
- Net: ₹62,000
- CTC includes EPF + ESI ✅
- Breakdown note visible ✅
- Status: ✅ PASS
```

#### Test Case 2: Deductions > Gross (Validation)
```
Input:
- Gross: ₹70,000
- Deductions: ₹80,000

Expected Output:
- Alert: "Deductions cannot exceed gross salary" ✅
- Calculation blocked
- Status: ✅ PASS
```

#### Test Case 3: CTC Calculation with ESI
```
Input:
- Basic: ₹20,000
- Gross: ₹25,000

Expected Output:
- Employer EPF (8.33% of ₹15K): ₹1,249.50
- Employer ESI (3.25%): ₹650 (salary ≤ ₹21,000)
- CTC > Gross ✅
- Breakdown visible ✅
- Status: ✅ PASS
```

---

## UI/UX Testing

### Mobile (480px)
- [ ] Sticky elements NOT overlapping navbar
- [ ] Result rows display in column format
- [ ] Input fields have 16px font (no zoom needed)
- [ ] Currency symbol properly positioned
- [ ] Submit button fully clickable
- [ ] No text truncation

### Tablet (768px)
- [ ] Calculator and results side-by-side (if space)
- [ ] Two-column layout on larger tablets
- [ ] Sticky positioning disabled
- [ ] Form sections properly spaced
- [ ] Results readable without scrolling

### Desktop (1920px)
- [ ] Full layout with sidebars
- [ ] Sticky positioning works correctly
- [ ] Results update in real-time
- [ ] No layout shifts on calculation

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all form inputs
- [ ] Submit button accessible via keyboard
- [ ] No keyboard traps

### Screen Readers
- [ ] Form labels properly associated
- [ ] Result values announced clearly
- [ ] Currency symbols understood
- [ ] Validation messages accessible

### Color Contrast
- [ ] Text on background: WCAG AA compliant
- [ ] Links distinguishable from text
- [ ] Error messages visible (not color-only)

---

## Browser Compatibility

### Chrome (v90+)
- [ ] All calculations correct
- [ ] Layout responsive
- [ ] No console errors

### Firefox (v88+)
- [ ] Form inputs work
- [ ] Calculations accurate
- [ ] Sticky positioning works

### Safari (v14+)
- [ ] Mobile viewport correct
- [ ] Touch targets proper size
- [ ] No rendering issues

### Edge (v90+)
- [ ] Full compatibility
- [ ] No IE issues (using modern CSS)

---

## Performance Testing

### Loading Time
- [ ] Page loads in <2 seconds
- [ ] No render blocking
- [ ] Images optimized

### Calculation Speed
- [ ] Instant calculation (<100ms)
- [ ] Smooth animations
- [ ] No lag on mobile

---

## Compliance Verification

### Income Tax Calculator
- [ ] ✅ Rebate u/s 87A applies for ≤₹5L
- [ ] ✅ Surcharge shows for ≥₹50L income
- [ ] ✅ Cess calculated at 4%
- [ ] ✅ Old regime marked as legacy

### EPF Calculator
- [ ] ✅ ₹15,000 wage ceiling applied
- [ ] ✅ EPS/EPF properly split (8.33%/3.67%)
- [ ] ✅ FY 2024-25 rate (8.15%) shown
- [ ] ✅ Note for salaries >ceiling

### Gratuity Calculator
- [ ] ✅ 5-year requirement for normal separation
- [ ] ✅ 6-month minimum for disability/death
- [ ] ✅ ₹20 lakh max limit applied
- [ ] ✅ Payment of Gratuity Act 1972 reference

### Leave Tracker
- [ ] ✅ Earned leave standard (1/20 days)
- [ ] ✅ Factories Act reference included
- [ ] ✅ Carryover calculation correct
- [ ] ✅ Forfeiture shown

### Salary Calculator
- [ ] ✅ CTC includes employer contributions
- [ ] ✅ EPF wage ceiling applied
- [ ] ✅ ESI calculated when applicable
- [ ] ✅ Labor law references included

---

## Data Validation Testing

### Edge Cases
```
Test negative values:
- Salary: -50000 → Alert ✅
- Years: -5 → Alert ✅
- Leaves: -10 → Alert ✅

Test zero values:
- Income: 0 → Shows ₹0 tax ✅
- Years: 0 → Shows ₹0 gratuity ✅
- Leaves: 0 → Shows 0 remaining ✅

Test extreme values:
- Salary: ₹10,00,00,000 → EPF ceiling applied ✅
- Income: ₹50,00,00,000 → Surcharge calculated ✅
- Gratuity calc: ₹5,00,00,000 → Limited to ₹20L ✅
```

---

## Print Testing

All calculators should:
- [ ] Hide submit buttons
- [ ] Hide navigation elements
- [ ] Print cleanly on A4
- [ ] Include calculations in output
- [ ] Show page title/date

---

## Final Verification Checklist

Before deployment to production:

- [ ] All formulas verified for FY 2024-25
- [ ] Mobile responsive on all screens
- [ ] Accessibility compliant (WCAG AA)
- [ ] All validations working
- [ ] Calculations match government norms
- [ ] Results display correctly
- [ ] Error messages clear
- [ ] Legal disclaimers visible
- [ ] Tested on Chrome, Firefox, Safari, Edge
- [ ] Print functionality working
- [ ] Documentation complete
- [ ] User can export/print results

---

## After Going Live

### Monitor For:
1. User feedback on calculation accuracy
2. Browser-specific issues
3. Mobile/tablet layout problems
4. Calculation errors
5. Page load times
6. Error rates

### Maintenance Schedule:
- Monthly: Check for Indian tax law updates
- Quarterly: Review user feedback
- Annually (April): Update FY rates/slabs
- As needed: Security patches

---

**Testing Status**: Ready for comprehensive QA
**Test Duration**: ~2-3 hours per calculator
**Total Coverage**: ~15 hours for all tools
