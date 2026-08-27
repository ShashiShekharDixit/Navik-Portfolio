/* ═══════════════════════════════════════════════════════════
   navik — Universal Demo Form Modal
   Works across all pages for Book Demo button clicks
   ═══════════════════════════════════════════════════════════ */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVLKYM_vFzPbSN3dR80ZWMyf03L-ZwxKaNvXwb9Bv5MwzVjwQo5mM3I5zpe7O2UaHR/exec';

class DemoFormModal {
  constructor() {
    this.isSubmitting = false;
    this.init();
  }

  init() {
    // Check if we're on index.html with #demo anchor
    if (this.isIndexPage() && this.isDemoHash()) {
      return; // Use native form on index.html
    }
    
    // For all other pages, create modal
    this.createModal();
    this.setupEventListeners();
    
    // Auto-open if hash is #demo
    if (this.isDemoHash()) {
      this.openModal();
    }
  }

  isIndexPage() {
    const pathname = window.location.pathname;
    return pathname.endsWith('index.html') || pathname.endsWith('/') || pathname === '';
  }

  isDemoHash() {
    return window.location.hash === '#demo' || window.location.hash === '#/demo';
  }

  createModal() {
    const existingModal = document.getElementById('demo-form-modal');
    if (existingModal) return; // Already created

    const modal = document.createElement('div');
    modal.id = 'demo-form-modal';
    modal.className = 'demo-form-modal';
    modal.innerHTML = `
      <div class="demo-form-overlay"></div>
      <div class="demo-form-content">
        <div class="demo-form-container">
          <!-- Close Button -->
          <button class="demo-form-close" onclick="demoFormModal && demoFormModal.closeModal()">×</button>
          
          <!-- Form -->
          <div class="demo-form-wrapper">
            <h2>Book Your Free Demo</h2>
            <p class="demo-form-subtitle">Join 50+ companies using navik for complete HR, workforce, and payroll control.</p>
            
            <form id="demo-form-modal-form" class="demo-form">
              <!-- Honeypot (spam trap, hidden) -->
              <input type="text" name="hp_field" id="demo-hp_field" style="display:none" tabindex="-1" autocomplete="off">

              <div class="demo-form-group">
                <input type="text" id="demo-name" name="name" class="demo-form-input" placeholder="Full Name *" maxlength="100" autocomplete="name" required>
                <span class="demo-form-err" id="demo-err_name"></span>
              </div>

              <div class="demo-form-group">
                <input type="text" id="demo-company" name="company" class="demo-form-input" placeholder="Company Name *" maxlength="100" autocomplete="organization" required>
                <span class="demo-form-err" id="demo-err_company"></span>
              </div>

              <div class="demo-form-group">
                <input type="email" id="demo-email" name="email" class="demo-form-input" placeholder="Work Email *" maxlength="150" autocomplete="email" required>
                <span class="demo-form-err" id="demo-err_email"></span>
              </div>

              <div class="demo-form-group">
                <input type="tel" id="demo-phone" name="phone" class="demo-form-input" placeholder="Phone Number * (10 digits)" maxlength="15" autocomplete="tel" required>
                <span class="demo-form-err" id="demo-err_phone"></span>
              </div>

              <div class="demo-form-group">
                <select id="demo-size" name="companySize" class="demo-form-input demo-form-select" required>
                  <option value="" disabled selected>Company Size *</option>
                  <option value="1-10">1–10 employees</option>
                  <option value="11-50">11–50 employees</option>
                  <option value="51-200">51–200 employees</option>
                  <option value="201-500">201–500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
                <span class="demo-form-err" id="demo-err_size"></span>
              </div>

              <button type="submit" class="demo-form-submit-btn" id="demoFormSubmitBtn">
                <span class="btn-label">Book Your Demo</span>
                <span class="btn-loading" style="display:none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Submitting…
                </span>
              </button>
            </form>

            <div class="demo-form-success" id="demoFormSuccess" style="display:none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Your demo request has been submitted successfully. We'll be in touch shortly!</span>
            </div>
            <div class="demo-form-error" id="demoFormError" style="display:none">
              Something went wrong. Please try again.
            </div>

            <p class="demo-form-note">No credit card required. Setup in 48 hours.</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Form submission
    const form = document.getElementById('demo-form-modal-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
  }

  setupEventListeners() {
    // Close modal on overlay click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('demo-form-overlay')) {
        this.closeModal();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen()) {
        this.closeModal();
      }
    });

    // Open modal when hash changes to #demo
    window.addEventListener('hashchange', () => {
      if (this.isDemoHash() && !this.isIndexPage()) {
        this.openModal();
      }
    });

    // Setup real-time validation
    this.setupValidation();
  }

  setupValidation() {
    const fields = {
      name: { id: 'demo-name', required: true, validation: (v) => v.trim().length >= 2 },
      company: { id: 'demo-company', required: true, validation: (v) => v.trim().length >= 2 },
      email: { id: 'demo-email', required: true, validation: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      phone: { id: 'demo-phone', required: true, validation: (v) => /^\d{10,}$/.test(v.replace(/\D/g, '')) },
      size: { id: 'demo-size', required: true, validation: (v) => v.trim() !== '' }
    };

    Object.entries(fields).forEach(([key, field]) => {
      const input = document.getElementById(field.id);
      if (!input) return;

      input.addEventListener('blur', () => {
        const value = input.value.trim();
        const errEl = document.getElementById(`demo-err_${key}`);

        if (field.required && !value) {
          if (errEl) errEl.textContent = 'This field is required';
        } else if (value && !field.validation(value)) {
          if (errEl) {
            if (key === 'email') errEl.textContent = 'Please enter a valid email';
            else if (key === 'phone') errEl.textContent = 'Please enter a valid 10-digit phone';
            else errEl.textContent = 'Please enter a valid value';
          }
        } else {
          if (errEl) errEl.textContent = '';
        }
      });

      input.addEventListener('input', () => {
        const errEl = document.getElementById(`demo-err_${key}`);
        if (errEl) errEl.textContent = '';
      });
    });
  }

  validateForm() {
    const form = document.getElementById('demo-form-modal-form');
    const fields = {
      name: { id: 'demo-name', required: true, validation: (v) => v.trim().length >= 2 },
      company: { id: 'demo-company', required: true, validation: (v) => v.trim().length >= 2 },
      email: { id: 'demo-email', required: true, validation: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      phone: { id: 'demo-phone', required: true, validation: (v) => /^\d{10,}$/.test(v.replace(/\D/g, '')) },
      size: { id: 'demo-size', required: true, validation: (v) => v.trim() !== '' }
    };

    let isValid = true;
    Object.entries(fields).forEach(([key, field]) => {
      const input = document.getElementById(field.id);
      const errEl = document.getElementById(`demo-err_${key}`);
      const value = input.value.trim();

      if (field.required && !value) {
        if (errEl) errEl.textContent = 'This field is required';
        isValid = false;
      } else if (value && !field.validation(value)) {
        if (errEl) {
          if (key === 'email') errEl.textContent = 'Please enter a valid email';
          else if (key === 'phone') errEl.textContent = 'Please enter a valid 10-digit phone';
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
    const submitBtn = document.getElementById('demoFormSubmitBtn');
    const btnLabel = submitBtn.querySelector('.btn-label');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successBox = document.getElementById('demoFormSuccess');
    const errorBox = document.getElementById('demoFormError');

    // Show loading state
    if (btnLabel) btnLabel.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'flex';
    submitBtn.disabled = true;
    if (successBox) successBox.style.display = 'none';
    if (errorBox) errorBox.style.display = 'none';

    try {
      // Get form data
      const form = document.getElementById('demo-form-modal-form');
      const formData = new FormData(form);

      // Build URL parameters (GET request)
      const params = new URLSearchParams();
      params.append('formType', 'demo');
      params.append('name', formData.get('name'));
      params.append('company', formData.get('company'));
      params.append('email', formData.get('email'));
      params.append('phone', formData.get('phone').replace(/\D/g, ''));
      params.append('companySize', formData.get('companySize'));
      params.append('hp_field', formData.get('hp_field') || '');

      const url = APPS_SCRIPT_URL + '?' + params.toString();

      console.log('Modal form sending via GET:', {
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        phone: formData.get('phone').replace(/\D/g, ''),
        companySize: formData.get('companySize'),
        url: url
      });

      // Send to Google Apps Script via GET
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });

      console.log('Modal form submitted successfully');

      // Show success message
      if (successBox) {
        successBox.style.display = 'flex';
        form.style.display = 'none';
      }

      // Reset form
      form.reset();

      // Close modal after 2 seconds
      setTimeout(() => {
        this.closeModal();
        if (successBox) successBox.style.display = 'none';
        form.style.display = 'flex';
      }, 2000);
    } catch (error) {
      console.error('Modal form fetch error:', error);
      if (errorBox) errorBox.style.display = 'block';
    } finally {
      this.isSubmitting = false;
      if (btnLabel) btnLabel.style.display = 'inline';
      if (btnLoading) btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  }

  isModalOpen() {
    const modal = document.getElementById('demo-form-modal');
    return modal && modal.classList.contains('active');
  }

  openModal() {
    const modal = document.getElementById('demo-form-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Focus on first input
      const firstInput = document.getElementById('demo-name');
      if (firstInput) firstInput.focus();
    }
  }

  closeModal() {
    const modal = document.getElementById('demo-form-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// Initialize on DOM ready
let demoFormModal = null;
document.addEventListener('DOMContentLoaded', () => {
  demoFormModal = new DemoFormModal();
});
