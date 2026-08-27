/* ═══════════════════════════════════════════════════════════
   navik — Product Page Router
   Handles dynamic product page loading via URL parameters
   ═══════════════════════════════════════════════════════════ */

let currentProduct = null;
let isNavigating = false;

const PRODUCT_DATA = {
  'hr-system': {
    title: 'HR System - Complete HR Management | navik',
    heading: 'HR System',
    subheading: 'Complete HR management solution to streamline recruitment, onboarding, and employee lifecycle management.',
    features: [
      'Recruitment Management & Applicant Tracking',
      'Employee Onboarding & Document Management',
      'Leave & Attendance Management',
      'Performance Management System',
      'Compliance & Policy Management',
      'Employee Directory & Organization Chart',
      'Real-time Reporting & Analytics',
      'Mobile Access for Employees'
    ]
  },
  'workforce-management': {
    title: 'Workforce Management - Shift Scheduling & Planning | navik',
    heading: 'Workforce Management',
    subheading: 'Intelligent shift scheduling and workforce planning to optimize team productivity and resource allocation.',
    features: [
      'Intelligent Shift Scheduling & Planning',
      'Real-time Availability Management',
      'Shift Swapping & Request Management',
      'Workload Balancing & Optimization',
      'Mobile Schedule Access for Employees',
      'Notification & Alert System',
      'Performance Metrics & KPIs',
      'Integration with Payroll System'
    ]
  },
  'payroll-system': {
    title: 'Payroll System - Automated Salary & Compliance | navik',
    heading: 'Payroll System',
    subheading: 'Automated payroll processing with complete tax compliance, deductions, and payment management.',
    features: [
      'Automated Salary Calculation & Processing',
      'Tax Deduction & Compliance Management',
      'Employee Self-Service Payslips',
      'Bank Transfer & Payment Integration',
      'Statutory Reporting & Compliance',
      'Custom Allowances & Deductions',
      'Attendance Integration',
      'Multi-currency Support'
    ]
  },
  'attendance': {
    title: 'Attendance Management - Smart Attendance System | navik',
    heading: 'Attendance Management',
    subheading: 'Smart attendance tracking with face recognition, biometric verification, and real-time monitoring.',
    features: [
      'Face Recognition Check-in/Check-out',
      'Biometric Integration (Fingerprint, Iris)',
      'Mobile App Check-in with GPS Tracking',
      'Multi-Punch Attendance Support',
      'Real-time Dashboard & Reports',
      'Leave & Absence Management',
      'Holiday & Shift Calendar Management',
      'Compliance & Audit Reporting'
    ]
  },
  'contract-workforce': {
    title: 'Contract Workforce Management | navik',
    heading: 'Contract Workforce Management',
    subheading: 'Streamlined management of contract workers, temporary staff, and contingent workforce with full compliance.',
    features: [
      'Contract Management & Document Tracking',
      'Worker Onboarding & Verification',
      'Timesheet & Work Hour Tracking',
      'Compliance & Legal Documentation',
      'Payment Management & Invoice Processing',
      'Performance Rating & Reviews',
      'Worker Portal Access',
      'Reporting & Analytics'
    ]
  },
  'field-workforce-tracking': {
    title: 'Field Workforce Tracking - Real-time GPS Monitoring | navik',
    heading: 'Field Workforce Tracking',
    subheading: 'Real-time GPS tracking and location monitoring for your field teams with task management and route optimization.',
    features: [
      'Real-time GPS Location Tracking',
      'Task Assignment & Management',
      'Route Optimization & Navigation',
      'Check-in/Check-out at Locations',
      'Work Duration & Activity Tracking',
      'Mobile App with Offline Capability',
      'Geofencing & Zone Alerts',
      'Performance Analytics & Reports'
    ]
  },
  'employee-self-service': {
    title: 'Employee Self Service Portal | navik',
    heading: 'Employee Self Service Portal',
    subheading: 'Empower employees with direct access to their data, leave requests, payslips, and personal information.',
    features: [
      'Payslip Access & Download',
      'Leave Request & Approval Workflow',
      'Attendance & Shift Information',
      'Personal Information Management',
      'Bank Detail Update',
      'Document Access & Storage',
      'Performance Review Access',
      'Training & Development Records'
    ]
  },
  'compliance-management': {
    title: 'Compliance Management System | navik',
    heading: 'Compliance Management',
    subheading: 'Comprehensive compliance management to ensure adherence to all regulatory requirements and labor laws.',
    features: [
      'Policy & Procedure Management',
      'Employee Policy Sign-off Tracking',
      'Certification & License Tracking',
      'Compliance Calendar & Alerts',
      'Audit Trail & Document Versioning',
      'Compliance Checklist Management',
      'Reporting & Evidence Collection',
      'Multi-regulatory Support'
    ]
  },
  'reports-analytics': {
    title: 'Reports & Analytics - Advanced Business Intelligence | navik',
    heading: 'Reports & Analytics',
    subheading: 'Advanced business intelligence and analytics for data-driven decisions with customizable dashboards and real-time insights.',
    features: [
      'Customizable Dashboards & Widgets',
      'Real-time Reporting & Alerts',
      'HR Analytics & KPIs',
      'Payroll Reports & Analysis',
      'Attendance & Absence Analytics',
      'Employee Performance Metrics',
      'Export & Sharing Capabilities',
      'Predictive Analytics & Forecasting'
    ]
  }
};

function cleanupProductPage() {
  // Remove existing product page container
  const existingContainer = document.getElementById('product-page-container');
  if (existingContainer) {
    existingContainer.remove();
  }
  
  // Restore homepage sections and navbar
  document.querySelectorAll('section').forEach(section => {
    section.style.display = '';
  });
  
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.style.display = '';
  
  const footer = document.querySelector('footer');
  if (footer) footer.style.display = '';
}

function goBackHome() {
  if (isNavigating) return;
  isNavigating = true;
  
  // Clean up product page
  cleanupProductPage();
  currentProduct = null;
  
  // Change URL without triggering hashchange
  window.history.pushState(null, '', '#/');
  
  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  setTimeout(() => {
    isNavigating = false;
  }, 500);
}

function handleProductRouter() {
  if (isNavigating) return;
  
  // Get product from hash
  const hash = window.location.hash;
  const product = hash.replace('#/', '').split('/')[0];

  // Skip if this is a blog route (blog router will handle it)
  if (product === 'blog') {
    return;
  }

  // If no product or invalid product, show homepage
  if (!product || !PRODUCT_DATA[product]) {
    if (currentProduct !== null) {
      cleanupProductPage();
      currentProduct = null;
      document.title = 'navik — HR, WFM & Payroll';
    }
    return;
  }

  // If already on this product, don't reload
  if (currentProduct === product) {
    return;
  }

  currentProduct = product;
  const data = PRODUCT_DATA[product];
  document.title = data.title;

  // Hide all sections except the product page
  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
  });

  // Hide navbar for product pages
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.style.display = 'none';

  // Hide footer temporarily - we'll show it at the end
  const footer = document.querySelector('footer');
  if (footer) footer.style.display = 'none';

  // Remove existing product page if any
  const existingContainer = document.getElementById('product-page-container');
  if (existingContainer) existingContainer.remove();

  // Create product page container
  const container = document.createElement('div');
  container.id = 'product-page-container';
  container.style.cssText = `
    min-height: 100vh;
    background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    position: relative;
    animation: fadeIn 0.5s ease-in-out;
  `;

  container.innerHTML = `
    <style>
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    </style>
    <div style="position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 16px 0;">
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 28px;">
        <button id="backToHomeBtn" style="display: inline-flex; align-items: center; gap: 8px; color: #2563eb; text-decoration: none; font-weight: 600; font-size: 14px; padding: 8px 12px; border-radius: 8px; transition: all 0.3s; background: none; border: none; cursor: pointer;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Home
        </button>
      </div>
    </div>

    <div style="padding-top: 80px; padding-bottom: 40px;">
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 28px;">
        
        <!-- Hero Section -->
        <div style="text-align: center; margin-bottom: 100px; padding: 60px 0;">
          <div style="display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 106, 247, 0.1)); border-radius: 50px; margin-bottom: 24px;">
            <span style="color: #2563eb; font-weight: 700; font-size: 13px; letter-spacing: 0.5px;">PREMIUM SOLUTION</span>
          </div>
          <h1 style="font-size: 56px; font-weight: 900; color: #080f1e; margin: 0 0 16px 0; line-height: 1.2;">
            ${data.heading}
          </h1>
          <p style="font-size: 20px; color: #475569; max-width: 700px; margin: 0 auto; line-height: 1.6; font-weight: 500;">
            ${data.subheading}
          </p>
        </div>

        <!-- Overview Section -->
        <div style="background: #ffffff; border-radius: 20px; padding: 60px; margin-bottom: 80px; box-shadow: 0 4px 20px rgba(8, 15, 30, 0.06);">
          <h2 style="font-size: 36px; font-weight: 800; color: #080f1e; margin-bottom: 28px; margin-top: 0;">Overview</h2>
          <p style="font-size: 16px; color: #475569; line-height: 1.8; margin: 0 0 20px 0;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Comprehensive solution designed to streamline operations and improve efficiency.
          </p>
          <p style="font-size: 16px; color: #475569; line-height: 1.8; margin: 0;">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <!-- Key Features Section -->
        <div style="margin-bottom: 80px;">
          <h2 style="font-size: 36px; font-weight: 800; color: #080f1e; margin-bottom: 40px; margin-top: 0;">Key Features</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            ${data.features.map((feature, idx) => `
              <div style="background: #ffffff; padding: 32px; border-radius: 16px; border: 2px solid #f1f5f9; transition: all 0.3s; box-shadow: 0 2px 8px rgba(8, 15, 30, 0.04);">
                <div style="display: flex; align-items: flex-start; gap: 16px;">
                  <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb, #7c3aed); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 style="font-size: 16px; font-weight: 700; color: #080f1e; margin: 0 0 8px 0;">${feature}</h3>
                    <p style="font-size: 14px; color: #64748b; margin: 0; line-height: 1.6;">Streamlined implementation and seamless integration</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Benefits Section -->
        <div style="background: linear-gradient(135deg, #080f1e 0%, #1a2847 100%); border-radius: 20px; padding: 60px; margin-bottom: 80px; color: white;">
          <h2 style="font-size: 36px; font-weight: 800; color: #ffffff; margin-bottom: 40px; margin-top: 0;">Key Benefits</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;">
            <div>
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #2563eb, #60a5fa); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2v20m10-10H2"></path></svg>
              </div>
              <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Improve Efficiency</h3>
              <p style="font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0;">Operational efficiency and significant cost reduction</p>
            </div>
            <div>
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7c3aed, #a855f7); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Team Productivity</h3>
              <p style="font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0;">Increase engagement and overall team performance</p>
            </div>
            <div>
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #10b981, #34d399); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Compliance & Risk</h3>
              <p style="font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0;">Ensure compliance and reduce regulatory risks</p>
            </div>
            <div>
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #f59e0b, #fbbf24); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline><polyline points="12 12 20 7.5"></polyline><polyline points="12 21 12 12"></polyline><polyline points="4 7.5 12 12"></polyline></svg>
              </div>
              <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Data Insights</h3>
              <p style="font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0;">Enable intelligent, data-driven decision making</p>
            </div>
            <div>
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #ef4444, #f87171); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Scalability</h3>
              <p style="font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0;">Scale operations seamlessly as your business grows</p>
            </div>
            <div>
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #06b6d4, #22d3ee); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2v20m10-10H2"></path></svg>
              </div>
              <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">24/7 Support</h3>
              <p style="font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0;">Dedicated support whenever you need assistance</p>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div style="text-align: center; padding: 60px 0; margin-bottom: 40px;">
          <h2 style="font-size: 36px; font-weight: 800; color: #080f1e; margin: 0 0 20px 0;">Ready to Transform Your Business?</h2>
          <p style="font-size: 18px; color: #475569; margin: 0 0 36px 0; max-width: 600px; margin-left: auto; margin-right: auto;">
            Contact our team today to schedule a personalized demo and see how ${data.heading} can revolutionize your operations.
          </p>
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="mailto:contact@navik.com" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border-radius: 12px; font-weight: 600; text-decoration: none; font-size: 16px; transition: all 0.3s;">
              Schedule Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <button id="bottomBackBtn" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: white; color: #2563eb; border: 2px solid #2563eb; border-radius: 12px; font-weight: 600; text-decoration: none; font-size: 16px; transition: all 0.3s; cursor: pointer;">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertBefore(container, document.body.firstChild);

  // Attach back button event listeners
  const backBtn = document.getElementById('backToHomeBtn');
  const bottomBtn = document.getElementById('bottomBackBtn');
  
  if (backBtn) {
    backBtn.addEventListener('click', goBackHome);
  }
  if (bottomBtn) {
    bottomBtn.addEventListener('click', goBackHome);
  }

  // Show footer at the bottom
  if (footer) {
    footer.style.display = 'block';
    footer.style.marginTop = '0';
  }

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  handleProductRouter();
});

// Handle navigation via browser back/forward buttons
window.addEventListener('hashchange', () => {
  handleProductRouter();
});

// Handle keyboard ESC key to go back
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && currentProduct !== null) {
    goBackHome();
  }
});

// Initial check on page load if DOM is already ready
if (document.readyState === 'complete') {
  handleProductRouter();
}
