// ═══════════════════════════════════════════
// TEMPLATES PAGE HANDLER
// ═══════════════════════════════════════════

class TemplatesManager {
  constructor() {
    this.templates = this.getTemplateData();
    this.filteredTemplates = [...this.templates];
    this.activeCategory = 'all';
    this.init();
  }

  getTemplateData() {
    return [
      // Muster Roll Data Sheet - First Template
      {
        id: 0,
        title: 'Muster Roll Data Sheet',
        description: 'Maintain labor attendance, contractor workforce records, daily wages, and site worker details using a professional muster roll template designed for construction and industrial projects.',
        category: 'attendance',
        icon: '📋',
        badge: 'Excel',
        fileType: 'Excel',
        downloads: 8956,
        format: 'xlsx',
        url: 'https://res.cloudinary.com/dne97stwg/raw/upload/v1782793700/Muster_Roll_Data_Sheet_uilyzj.xlsx',
        postedDate: new Date(2026, 5, 29) // June 29, 2026
      },
      
      // Leave Tracker Template - Second Template
      {
        id: 1,
        title: 'Leave Tracker Template',
        description: 'Monitor employee leave requests, paid leaves, sick leaves, casual leaves, and leave balances with an organized leave management tracker.',
        category: 'hr',
        icon: '🏖️',
        badge: 'Excel',
        fileType: 'Excel',
        downloads: 4521,
        format: 'xlsx',
        url: 'https://res.cloudinary.com/dne97stwg/raw/upload/v1782794179/Leave_Tracker_Template_p3amm7.xlsx',
        postedDate: new Date(2026, 5, 30) // June 30, 2026
      },

      // Overtime Report Template - Third Template
      {
        id: 2,
        title: 'Overtime Report Template',
        description: 'Track employee overtime hours, extra shifts, approval status, and overtime payments accurately with a ready-to-use overtime reporting sheet.',
        category: 'payroll',
        icon: '⏱️',
        badge: 'Excel',
        fileType: 'Excel',
        downloads: 3245,
        format: 'xlsx',
        url: 'https://res.cloudinary.com/dne97stwg/raw/upload/v1782794430/Overtime_Report_Template_pokb8h.xlsx',
        postedDate: new Date(2026, 5, 30) // June 30, 2026
      },

      // Employee Summary Report - Fourth Template
      {
        id: 3,
        title: 'Employee Summary Report',
        description: 'Generate a complete overview of employee information including department, designation, attendance, overtime, leave balance, and performance details in one organized report.',
        category: 'reports',
        icon: '📊',
        badge: 'Excel',
        fileType: 'Excel',
        downloads: 5678,
        format: 'xlsx',
        url: 'https://res.cloudinary.com/dne97stwg/raw/upload/v1782794536/Employee_Summary_Report_ecfn1p.xlsx',
        postedDate: new Date(2026, 5, 30) // June 30, 2026
      },

      // Employee Onboarding Form - Fifth Template
      {
        id: 4,
        title: 'Employee Onboarding Form',
        description: 'Complete employee onboarding and joining form designed for HR departments, corporate offices, factories, construction companies, startups, and business organizations.',
        category: 'hr',
        icon: '📝',
        badge: 'PDF',
        fileType: 'PDF',
        downloads: 6234,
        format: 'pdf',
        url: 'https://drive.google.com/uc?export=download&id=1SQpYnNEqeUJg8HMv8raKVk8PwE3bZdxp',
        postedDate: new Date(2026, 5, 30) // June 30, 2026
      }
    ];
  }

  init() {
    this.setupEventListeners();
    this.renderTemplates();
  }

  setupEventListeners() {
    // Category tab filtering
    document.querySelectorAll('.templates-tab').forEach(tab => {
      tab.addEventListener('click', (e) => this.filterByCategory(e));
    });

    // Search functionality
    const searchInput = document.getElementById('templatesSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.searchTemplates(e.target.value));
    }

    // Download buttons - show gated download modal
    document.addEventListener('click', (e) => {
      if (e.target.closest('.template-download-btn')) {
        e.preventDefault();
        const btn = e.target.closest('.template-download-btn');
        const templateId = btn.dataset.id;
        const format = btn.dataset.format;
        const template = this.templates.find(t => t.id == templateId);
        
        if (template && downloadGateManager) {
          const filename = `${template.title.toLowerCase().replace(/\s+/g, '-')}.${format}`;
          downloadGateManager.requestDownload(template.url, filename, 'file');
        }
      }
    });
  }

  filterByCategory(e) {
    // Remove active class from all tabs
    document.querySelectorAll('.templates-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    e.currentTarget.classList.add('active');
    
    // Filter templates
    const category = e.currentTarget.dataset.category;
    this.activeCategory = category;
    
    if (category === 'all') {
      this.filteredTemplates = [...this.templates];
    } else {
      this.filteredTemplates = this.templates.filter(t => t.category === category);
    }
    
    this.renderTemplates();
  }

  searchTemplates(query) {
    const searchTerm = query.toLowerCase();
    
    if (!searchTerm) {
      if (this.activeCategory === 'all') {
        this.filteredTemplates = [...this.templates];
      } else {
        this.filteredTemplates = this.templates.filter(t => t.category === this.activeCategory);
      }
    } else {
      this.filteredTemplates = this.templates.filter(t => 
        (this.activeCategory === 'all' || t.category === this.activeCategory) &&
        (t.title.toLowerCase().includes(searchTerm) || 
         t.description.toLowerCase().includes(searchTerm) ||
         t.fileType.toLowerCase().includes(searchTerm))
      );
    }
    
    this.renderTemplates();
  }

  renderTemplates() {
    const container = document.getElementById('templatesContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (!container) return;
    
    if (this.filteredTemplates.length === 0) {
      container.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    
    emptyState.style.display = 'none';
    container.innerHTML = this.filteredTemplates.map(template => this.createTemplateCard(template)).join('');
  }

  createTemplateCard(template) {
    // Calculate relative time from posting date
    const relativeDate = this.getRelativeDate(template.postedDate);
    
    return `
      <div class="template-card" data-id="${template.id}">
        <div class="template-content">
          <span class="template-badge">${template.badge}</span>
          <h3 class="template-title">${template.title}</h3>
          <p class="template-description">${template.description}</p>
          
          <div class="template-meta">
            <span class="template-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 5 7 13 17 13 17 5"/></svg>
              ${template.fileType}
            </span>
            <span class="template-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 14.899A7 7 0 1 1 15.71 8m-5.5 9.7A7.002 7.002 0 0 0 20 9.999"/><path d="M12 17v-7"/></svg>
              ${template.downloads.toLocaleString()} Downloads
            </span>
            <span class="template-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${relativeDate}
            </span>
          </div>
          
          <div class="template-download">
            <a href="${template.url}" class="template-download-btn primary" data-id="${template.id}" data-format="${template.format}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download
            </a>
          </div>
        </div>
      </div>
    `;
  }

  getRelativeDate(postedDate) {
    const now = new Date();
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    
    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
}

// Initialize templates manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TemplatesManager();
});
