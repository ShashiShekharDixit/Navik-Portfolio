# Book Demo Form - Debug Guide

## Issue: Empty Form Data in Emails

The form appears to submit successfully but email contains empty field values.

## Steps to Debug and Fix

### Step 1: Check Browser Console
1. Open your browser
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Fill the Book Demo form and submit
5. Look for messages like:
   ```
   Form data being sent: {
     formType: "demo",
     name: "John Doe",
     company: "Acme Corp",
     email: "john@example.com",
     phone: "9876543210",
     companySize: "51-200",
     payload: "formType=demo&name=John+Doe&company=Acme+Corp..."
   }
   ```

**If you see empty values like `name: "", company: "",` etc.:**
- The form validation might not be working
- The input fields might not be getting values properly
- Check the field IDs in the HTML vs the JavaScript

### Step 2: Check Google Apps Script Logs
1. Go to [script.google.com](https://script.google.com)
2. Open your "Navik Demo" project
3. Click **View** > **Execution Log**
4. Look for recent executions and check the log entries:
   ```
   Raw data received: {"formType":["demo"],"name":["John Doe"],"company":["Acme Corp"],...}
   Extracted - Name: John Doe, Email: john@example.com, ...
   Row appended to sheet
   ```

**If you see `Raw data received: {}` (empty):**
- The data is NOT being sent from the form
- Check browser console for JavaScript errors
- Verify the Google Apps Script URL is correct in `main.js`

### Step 3: Verify Google Apps Script URL
1. In `main.js` (line ~1073), find:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwjeLah1BLULxFGBCAMmfBPhWP1Jl3bQ1JmHJ_RT_cnY_luiDTgeCAxpPc-7X1HGdWHJQ/exec';
   ```

2. In `demo-form-modal.js` (line ~6), verify the same URL exists

3. Go to your Google Apps Script deployment:
   - The URL should be a Web App deployment
   - It should show "Anyone" in Who Has Access
   - Execute as your Google account

### Step 4: Test the Deployment Directly
Test if the Google Apps Script is receiving data:

1. Go to [script.google.com](https://script.google.com)
2. Click **Deploy** > **New Deployment**
3. Get the latest deployment URL
4. In your browser address bar, add query parameters:
   ```
   https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?name=Test&company=TestCorp&email=test@example.com&phone=9876543210&companySize=51-200
   ```
5. If it works, you'll see: `{"status":"ok"}`
6. Check Google Sheet for the new row
7. Check emails for the submission

### Step 5: Common Issues & Solutions

**Issue: Browser console shows fetch error**
- Likely a CORS issue or wrong URL
- Solution: Verify the Google Apps Script URL is correct and deployment is public

**Issue: Browser console shows empty payload**
- The form fields are empty or not found
- Solution: Check field IDs in HTML match the JavaScript selectors:
  - HTML: `<input id="cf_name" ...>`
  - JS: `const get = id => document.getElementById(id);`
  - Must match exactly

**Issue: Google Apps Script shows `Raw data received: {}`**
- Data not being sent or sent in wrong format
- Solution: Check that `URLSearchParams` is being used (not FormData)

**Issue: Google Apps Script shows extracted values are empty**
- `getValue()` function not working properly
- Solution: The getValue function should extract array values correctly

### Step 6: Re-Deploy Google Apps Script
If you made any changes to `google-apps-script.js`:

1. Go to [script.google.com](https://script.google.com)
2. Open your Navik project
3. Select all code and delete it
4. Paste the updated code from `google-apps-script.js`
5. Click **Deploy** > **New Deployment**
6. Select **Web App**
7. **Execute as:** your Google email
8. **Who has access:** Anyone
9. Click **Deploy**
10. Copy the new deployment URL
11. If URL changed, update:
    - `main.js` (line ~1073): `const APPS_SCRIPT_URL = '...'`
    - `demo-form-modal.js` (line ~6): `const APPS_SCRIPT_URL = '...'`

### Step 7: Test All Forms
After deployment:

1. **Test Home Page Form** (index.html)
   - Fill all fields
   - Click "Book Demo"
   - Check console for logs
   - Should see success message
   - Check Google Sheet
   - Check email inbox

2. **Test Modal Forms**
   - Go to about-us.html or any sub-page
   - Click "Book Demo" in navbar
   - Fill the modal form
   - Click "Book Your Demo"
   - Check console
   - Check Google Sheet
   - Check email

### Browser DevTools Quick Reference

**To view form payload:**
```javascript
// In Console, run after filling form:
new URLSearchParams({
  formType: 'demo',
  name: document.getElementById('cf_name').value,
  company: document.getElementById('cf_company').value,
  email: document.getElementById('cf_email').value,
  phone: document.getElementById('cf_phone').value,
  companySize: document.getElementById('cf_size').value
}).toString()
```

**To view modal form payload:**
```javascript
// In Console:
const form = document.getElementById('demo-form-modal-form');
const fd = new FormData(form);
new URLSearchParams(fd).toString()
```

### Still Having Issues?

1. Check the **Execution Log** in Google Apps Script
2. Look at the most recent execution for error messages
3. Check the **Apps Script email** alerts (may have permission issues)
4. Verify Google Sheet exists and has the correct name "Navik Response"
5. Check admin email address is correct in `google-apps-script.js`

### What Should Work:
✅ Form validation works  
✅ Console shows populated data  
✅ Fetch to Google Apps Script succeeds  
✅ Success message appears  
✅ Google Sheet records data  
✅ Admin email receives submission details  
✅ User receives auto-reply email  
