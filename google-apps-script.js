/**
 * Navik — Book Demo Form Handler
 * Google Apps Script (deploy as Web App)
 * Now handles GET requests with query parameters
 */

const SHEET_ID    = '1PLdwd5giVODJNbrbHbl6RccLK_1a4kJ_GrsbhSgZ1ss';
const SHEET_NAME  = 'Navik Response';
const ADMIN_EMAIL = 'riya.shukla@wfmexperts.com';

function doGet(e) {
  Logger.log('=== doGet called ===');
  Logger.log('e.parameter: ' + JSON.stringify(e.parameter));
  
  return processFormData(e.parameter || {});
}

function doPost(e) {
  Logger.log('=== doPost called (should not happen) ===');
  Logger.log('e: ' + JSON.stringify(e));
  
  // Fallback: try to process as if it were a GET
  return processFormData(e.parameter || {});
}

function processFormData(params) {
  try {
    Logger.log('Processing params: ' + JSON.stringify(params));
    
    // Extract values
    const formType = params.formType ? String(params.formType).trim() : 'demo';
    const name = params.name ? String(params.name).trim() : '';
    const company = params.company ? String(params.company).trim() : '';
    const email = params.email ? String(params.email).trim() : '';
    const phone = params.phone ? String(params.phone).trim() : '';
    const companySize = params.companySize ? String(params.companySize).trim() : '';
    const message = params.message ? String(params.message).trim() : '';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    Logger.log('Extracted values:');
    Logger.log('  name: ' + name);
    Logger.log('  company: ' + company);
    Logger.log('  email: ' + email);
    Logger.log('  phone: ' + phone);
    Logger.log('  companySize: ' + companySize);
    Logger.log('  message: ' + message);
    
    // Honeypot check
    const hp = params.hp_field ? String(params.hp_field).trim() : '';
    if (hp !== '') {
      Logger.log('Honeypot triggered - ignoring');
      return jsonResponse({ status: 'ok' });
    }
    
    // Write to sheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.getSheets()[0];
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Form Type', 'Name', 'Company', 'Email', 'Phone', 'Company Size', 'Subject', 'Message']);
      sheet.getRange(1, 1, 1, 9)
        .setFontWeight('bold')
        .setBackground('#0f1f4b')
        .setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }
    
    sheet.appendRow([timestamp, formType, name, company, email, phone, companySize, '', message]);
    Logger.log('Row written to sheet at row ' + sheet.getLastRow());
    
    // Send emails only if we have name and email
    if (name && email) {
      try {
        const adminSubject = `New Demo Request – Navik | ${name} (${company})`;
        const adminBody = `New Demo Request — Navik\n\nName:         ${name}\nCompany:      ${company}\nEmail:        ${email}\nPhone:        ${phone}\nCompany Size: ${companySize}\nMessage:      ${message || '—'}\nSubmitted:    ${timestamp}`;
        
        MailApp.sendEmail(ADMIN_EMAIL, adminSubject, adminBody);
        Logger.log('Admin email sent to ' + ADMIN_EMAIL);
        
        const userSubject = "Your Navik Demo Request – We'll Be in Touch!";
        const userBody = `Hi ${name},\n\nThank you for your interest in Navik!\n\nWe've received your demo request and our team will reach out to you within 24 hours to schedule your personalised demo.\n\nYour Details:\n  Company:      ${company}\n  Phone:        ${phone}\n  Company Size: ${companySize}\n\nIn the meantime, feel free to explore our platform at https://navikops.com\n\nBest regards,\nThe Navik Team`;
        
        MailApp.sendEmail(email, userSubject, userBody);
        Logger.log('User email sent to ' + email);
      } catch (emailErr) {
        Logger.log('Email error: ' + emailErr.message);
      }
    }
    
    Logger.log('Form processing completed successfully');
    return jsonResponse({ status: 'ok', message: 'Data recorded' });
    
  } catch (err) {
    Logger.log('ERROR in processFormData: ' + err.message);
    Logger.log('Stack: ' + err.stack);
    return jsonResponse({ status: 'error', message: err.message });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
