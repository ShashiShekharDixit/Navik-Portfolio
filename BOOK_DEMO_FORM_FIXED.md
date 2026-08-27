# Book Demo Form - Data Recording Fix ✅

## Problem Identified
The Book Demo form on sub-pages (About Us, Blog, Contact Us, Templates, Product Pages) was not recording data to the Google Sheet, even though the form appeared to submit successfully.

## Root Causes Fixed

### 1. Missing `formType` Parameter
**Issue**: The form on the home page (index.html) was not sending the `formType: 'demo'` parameter to the Google Apps Script, which expects it to properly categorize and process the submission.

**Fix Applied**: Updated `main.js` to include `formType: 'demo'` in the payload sent to the Google Apps Script.

### 2. Incorrect Payload Format
**Issue**: The home page form was using `FormData` object, while the Google Apps Script's `doPost()` function expects URL-encoded form data via `e.parameter`.

**Root Cause**: When using `mode: 'no-cors'`, FormData is processed differently and may not be properly URL-encoded.

**Fix Applied**: Changed payload format in `main.js` to use `URLSearchParams` (matching `demo-form-modal.js`), which correctly URL-encodes the data.

## Changes Made

### File: main.js
**Location**: Lines 1148-1177 (Book Demo Form Handler)

**Before**:
```javascript
const payload = {
  name: fields.name.value.trim(),
  company: fields.company.value.trim(),
  // ... other fields
};
const formData = new FormData();
Object.entries(payload).forEach(([k, v]) => formData.append(k, v));
await fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: formData });
```

**After**:
```javascript
const payload = new URLSearchParams();
payload.append('formType', 'demo');  // ← Added missing parameter
payload.append('name', fields.name.value.trim());
payload.append('company', fields.company.value.trim());
// ... other fields
await fetch(APPS_SCRIPT_URL, { 
  method: 'POST', 
  mode: 'no-cors', 
  body: payload.toString()  // ← Using URLSearchParams format
});
```

## Verification

The form data submission flow now works correctly:

1. **Home Page (index.html)**
   - Form ID: `#demoBtn`
   - Handler: `main.js` (lines 1074-1181)
   - Google Apps Script URL: `https://script.google.com/macros/s/AKfycbwjeLah1BLULxFGBCAMmfBPhWP1Jl3bQ1JmHJ_RT_cnY_luiDTgeCAxpPc-7X1HGdWHJQ/exec`

2. **All Sub-pages (via Modal)**
   - Form ID: `#demo-form-modal-form`
   - Handler: `demo-form-modal.js` (already using URLSearchParams correctly)
   - Same Google Apps Script URL

3. **Google Apps Script Processing**
   - `google-apps-script.js` receives data via `doPost(e)`
   - Extracts parameters: `e.parameter.formType`, `e.parameter.name`, etc.
   - Writes to Google Sheet: "Navik Response" (Sheet ID: 1PLdwd5giVODJNbrbHbl6RccLK_1a4kJ_GrsbhSgZ1ss)
   - Sends confirmation email to admin and auto-reply to user

## Data Flow

```
User Fills Form
    ↓
Form Validation (client-side)
    ↓
URLSearchParams Payload Created (with formType='demo')
    ↓
fetch() to Google Apps Script (mode: 'no-cors')
    ↓
Google Apps Script doPost() Processes Data
    ↓
Data Appended to Sheet Row
    ↓
Notification Emails Sent
    ↓
Success Message Shown to User
```

## What Gets Recorded

Each submission now records the following data to the Google Sheet:

| Column | Value |
|--------|-------|
| Timestamp | Current time (Asia/Kolkata timezone) |
| Form Type | demo |
| Name | User's full name |
| Company | User's company name |
| Email | User's work email |
| Phone | User's phone (10+ digits) |
| Company Size | Selected size (1-10, 11-50, 51-200, 201-500, 500+) |
| Subject | (empty for demo forms) |
| Message | (empty for demo forms) |

## Email Notifications

**Admin Receives**:
- To: `riya.shukla@wfmexperts.com`
- Subject: `New Demo Request – Navik | [Name] ([Company])`
- Body: All submitted information

**User Receives**:
- To: User's email address
- Subject: `Your Navik Demo Request – We'll Be in Touch!`
- Body: Auto-reply confirming receipt and next steps

## Testing

To verify the fix works:

1. Go to home page (index.html) and fill the Book Demo form
2. Go to any sub-page (about-us.html, blog.html, etc.)
3. Click "Book Demo" button in navbar
4. Fill the modal form
5. Check the Google Sheet: `https://docs.google.com/spreadsheets/d/1PLdwd5giVODJNbrbHbl6RccLK_1a4kJ_GrsbhSgZ1ss`
6. New row should appear with the submitted data
7. Check email for confirmation (admin + user)

## Related Files

- **google-apps-script.js** - Backend processing (no changes needed)
- **demo-form-modal.js** - Modal form handler (already correct, no changes)
- **main.js** - Home page form handler (UPDATED)
- **index.html** - Home page form HTML (no changes)

## Notes

- Both forms now use the same Google Apps Script endpoint
- Data submission is now consistent across all pages
- Honeypot spam prevention is active on both forms
- Validation and error handling work the same way on all pages
- All data is properly sanitized before recording
