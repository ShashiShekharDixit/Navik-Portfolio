/* ═══════════════════════════════════════════════════════════
   navik — Download Gating System
   Shows Book Demo form before allowing downloads
   Uses same form structure and Google Apps Script integration
   ═══════════════════════════════════════════════════════════ */

// Google Apps Script endpoint (same as book demo form)
const DOWNLOAD_GATE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVLKYM_vFzPbSN3dR80ZWMyf03L-ZwxKaNvXwb9Bv5MwzVjwQo5mM3I5zpe7O2UaHR/exec';

class DownloadGateManager {
  constructor() {
    this.pendingDownload = null;
    this.formData = {};
    this.isSubmitting = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    // Don't create modal on init - create it when needed
  }

  createModal() {
    const existingModal = document.getElementById('download-gate-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'download-gate-modal';
    modal.className = 'download-gate-modal';
    modal.innerHTML = `
      <div class="download-gate-overlay" onclick="downloadGateManager.closeModal()"></div>
      <div class="download-gate-content">
        <div class="download-gate-container">
          <!-- Close Button -->
          <button type="button" class="download-gate-close" aria-label="Close modal">×</button>
          
          <!-- Form (same structure as book demo) -->
          <div class="download-gate-form-wrapper">
            <h2>Unlock Your Template</h2>
            <p class="download-gate-subtitle">Fill in your details to download</p>
            
            <form id="download-gate-form" class="download-gate-form">
              <!-- Honeypot (spam trap, hidden) -->
              <input type="text" name="hp_field" id="gate-hp_field" style="display:none" tabindex="-1" autocomplete="off">

              <div class="form-group">
                <input type="text" id="gate-name" name="name" class="gate-input" placeholder="Full Name *" maxlength="100" autocomplete="name" required>
                <span class="gate-err" id="gate-err_name"></span>
              </div>

              <div class="form-group">
                <input type="text" id="gate-company" name="company" class="gate-input" placeholder="Company Name *" maxlength="100" autocomplete="organization" required>
                <span class="gate-err" id="gate-err_company"></span>
              </div>

              <div class="form-group">
                <input type="email" id="gate-email" name="email" class="gate-input" placeholder="Work Email *" maxlength="150" autocomplete="email" required>
                <span class="gate-err" id="gate-err_email"></span>
              </div>

              <div class="form-group">
                <input type="tel" id="gate-phone" name="phone" class="gate-input" placeholder="Phone Number * (10 digits)" maxlength="15" autocomplete="tel" required>
                <span class="gate-err" id="gate-err_phone"></span>
              </div>

              <div class="form-group">
                <select id="gate-size" name="companySize" class="gate-input gate-select" required>
                  <option value="" disabled selected>Company Size *</option>
                  <option value="1-10">1–10 employees</option>
                  <option value="11-50">11–50 employees</option>
                  <option value="51-200">51–200 employees</option>
                  <option value="201-500">201–500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
                <span class="gate-err" id="gate-err_size"></span>
              </div>

              <button type="submit" class="download-gate-submit-btn" id="gateSubmitBtn">
                <span class="btn-label">Download Template</span>
                <span class="btn-loading" style="display:none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Processing…
                </span>
              </button>
            </form>

            <p class="gate-notice">Your information will be stored securely. <a href="#">Privacy Policy</a></p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Form submission
    const form = document.getElementById('download-gate-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
  }

  setupEventListeners() {
    // Close modal on overlay click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('download-gate-overlay')) {
        this.closeModal();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen()) {
        this.closeModal();
      }
    });
  }

  isModalOpen() {
    const modal = document.getElementById('download-gate-modal');
    return modal && modal.classList.contains('active');
  }

  openModal(downloadData) {
    this.pendingDownload = downloadData;
    let modal = document.getElementById('download-gate-modal');
    
    // Create modal only if it doesn't exist
    if (!modal) {
      this.createModal();
      modal = document.getElementById('download-gate-modal');
    }
    
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.resetForm();
    }
  }

  closeModal() {
    const modal = document.getElementById('download-gate-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    this.pendingDownload = null;
  }

  validateForm() {
    const form = document.getElementById('download-gate-form');
    const fields = {
      name: { id: 'gate-name', required: true, validation: (v) => v.trim().length >= 2 },
      company: { id: 'gate-company', required: true, validation: (v) => v.trim().length >= 2 },
      email: { id: 'gate-email', required: true, validation: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      phone: { id: 'gate-phone', required: true, validation: (v) => /^\d{10,}$/.test(v.replace(/\D/g, '')) },
      companySize: { id: 'gate-size', required: true, validation: (v) => v.trim() !== '' }
    };

    let isValid = true;
    Object.entries(fields).forEach(([key, field]) => {
      const input = document.getElementById(field.id);
      const errEl = document.getElementById(`gate-err_${key}`);
      const value = input.value.trim();

      if (field.required && !value) {
        if (errEl) errEl.textContent = 'This field is required';
        isValid = false;
      } else if (value && !field.validation(value)) {
        if (errEl) {
          if (key === 'email') errEl.textContent = 'Please enter a valid email';
          else if (key === 'phone') errEl.textContent = 'Please enter a valid 10-digit phone number';
          else errEl.textContent = 'Please enter a valid value';
        }
        isValid = false;
      } else {
        if (errEl) errEl.textContent = '';
      }
    });

    return isValid;
  }

  async handleFormSubmit() {
    if (this.isSubmitting) return;
    if (!this.validateForm()) return;

    this.isSubmitting = true;
    const submitBtn = document.getElementById('gateSubmitBtn');
    const btnLabel = submitBtn.querySelector('.btn-label');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Show loading state
    if (btnLabel) btnLabel.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'flex';
    submitBtn.disabled = true;

    try {
      // Get form data
      const form = document.getElementById('download-gate-form');
      const formData = new FormData(form);

      // Prepare payload for Google Apps Script
      const payload = new URLSearchParams();
      payload.append('formType', 'template-download');
      payload.append('name', formData.get('name'));
      payload.append('company', formData.get('company'));
      payload.append('email', formData.get('email'));
      payload.append('phone', formData.get('phone'));
      payload.append('companySize', formData.get('companySize'));
      payload.append('hp_field', formData.get('hp_field') || '');

      // Send to Google Apps Script via GET
      const url = DOWNLOAD_GATE_APPS_SCRIPT_URL + '?' + payload.toString();
      await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });

      // Store form data locally
      this.formData = {
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        companySize: formData.get('companySize'),
        downloadedAt: new Date().toISOString()
      };

      // Trigger download
      this.performDownload();

      // Close modal and reset
      this.closeModal();
      this.resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still allow download even if submission fails
      this.performDownload();
      this.closeModal();
    } finally {
      this.isSubmitting = false;
      if (btnLabel) btnLabel.style.display = 'inline';
      if (btnLoading) btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  }

  performDownload() {
    if (!this.pendingDownload) {
      console.error('No pending download');
      return;
    }

    const { url, filename, type } = this.pendingDownload;

    if (type === 'pdf' && !url.includes('.pdf')) {
      // Generate PDF for blogs
      this.generateAndDownloadPDF(filename);
    } else {
      // Direct download for templates/files
      this.directDownload(url, filename);
    }
  }

  directDownload(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || true;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  generateAndDownloadPDF(filename) {
    // Check if html2pdf is available, otherwise use simpler approach
    if (typeof html2pdf !== 'undefined') {
      const element = document.querySelector('.blog-content') || document.body;
      const opt = {
        margin: 10,
        filename: filename || 'download.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
      };
      html2pdf().set(opt).from(element).save();
    } else {
      // Fallback: Print to PDF
      window.print();
    }
  }

  resetForm() {
    const form = document.getElementById('download-gate-form');
    if (form) form.reset();
    // Clear error messages
    document.querySelectorAll('.gate-err').forEach(el => {
      el.textContent = '';
    });
  }

  // Public method to trigger download
  requestDownload(url, filename, type = 'file') {
    this.openModal({ url, filename, type });
  }
}

// Initialize on DOM ready
let downloadGateManager = null;
document.addEventListener('DOMContentLoaded', () => {
  // Don't create modal on page load - create it only when needed
  downloadGateManager = new DownloadGateManager();
  // Remove modal from DOM if it was created
  const existingModal = document.getElementById('download-gate-modal');
  if (existingModal && !existingModal.classList.contains('active')) {
    existingModal.remove();
  }
});
