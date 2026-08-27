#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of all product pages to check
const productPages = [
  'index.html',
  'hr-system.html',
  'workforce-management.html',
  'payroll-system.html',
  'attendance.html',
  'contract-workforce.html',
  'field-workforce-tracking.html',
  'employee-self-service.html',
  'complience-managemant.html',
  'reports-analytics.html',
  'blog.html',
  'templates.html'
];

// Expected links structure
const expectedLinks = {
  navbar: {
    products: [
      'hr-system.html',
      'workforce-management.html',
      'payroll-system.html',
      'attendance.html',
      'contract-workforce.html',
      'field-workforce-tracking.html',
      'employee-self-service.html',
      'complience-managemant.html',
      'reports-analytics.html'
    ],
    pricing: 'index.html#pricing',
    customers: 'index.html#trust',
    resources: [
      'blog.html',
      'templates.html'
    ],
    company: [
      '#' // About Us
    ]
  },
  footer: {
    products: [
      'hr-system.html',
      'workforce-management.html',
      'payroll-system.html',
      'attendance.html',
      'contract-workforce.html',
      'field-workforce-tracking.html',
      'employee-self-service.html',
      'complience-managemant.html',
      'reports-analytics.html'
    ],
    blog: 'blog.html',
    templates: 'templates.html'
  }
};

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return null;
  }
}

function extractNavLinks(html) {
  const navMatch = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/);
  if (!navMatch) return null;
  
  const nav = navMatch[0];
  const links = [];
  const hrefRegex = /href=["']([^"']+)["']/g;
  
  let match;
  while ((match = hrefRegex.exec(nav)) !== null) {
    links.push(match[1]);
  }
  
  return links;
}

function extractFooterLinks(html) {
  const footerMatch = html.match(/<footer[^>]*>[\s\S]*?<\/footer>/);
  if (!footerMatch) return null;
  
  const footer = footerMatch[0];
  const links = [];
  const hrefRegex = /href=["']([^"']+)["']/g;
  
  let match;
  while ((match = hrefRegex.exec(footer)) !== null) {
    links.push(match[1]);
  }
  
  return links;
}

function checkLinksExist(links, baseDir) {
  const results = {
    valid: [],
    invalid: [],
    external: []
  };
  
  links.forEach(link => {
    if (link.startsWith('#')) {
      results.valid.push(link);
    } else if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('tel:')) {
      results.external.push(link);
    } else {
      const filePath = path.join(baseDir, link.split('#')[0]);
      if (fs.existsSync(filePath)) {
        results.valid.push(link);
      } else {
        results.invalid.push(link);
      }
    }
  });
  
  return results;
}

console.log('='.repeat(80));
console.log('NAVIK LINK VERIFICATION REPORT');
console.log('='.repeat(80));
console.log('');

const baseDir = path.dirname(__filename);
let totalErrors = 0;

productPages.forEach(page => {
  const filePath = path.join(baseDir, page);
  const html = readFile(filePath);
  
  if (!html) {
    console.log(`❌ ${page}: FILE NOT FOUND\n`);
    totalErrors++;
    return;
  }
  
  console.log(`📄 ${page}`);
  console.log('-'.repeat(80));
  
  // Check navbar
  const navLinks = extractNavLinks(html);
  if (navLinks && navLinks.length > 0) {
    const navResults = checkLinksExist(navLinks, baseDir);
    console.log(`  Navbar Links: ${navLinks.length} found`);
    if (navResults.invalid.length > 0) {
      console.log(`    ❌ Invalid: ${navResults.invalid.join(', ')}`);
      totalErrors += navResults.invalid.length;
    } else {
      console.log(`    ✅ All navbar links valid`);
    }
  } else {
    console.log(`  ⚠️  No navbar found`);
    totalErrors++;
  }
  
  // Check footer
  const footerLinks = extractFooterLinks(html);
  if (footerLinks && footerLinks.length > 0) {
    const footerResults = checkLinksExist(footerLinks, baseDir);
    console.log(`  Footer Links: ${footerLinks.length} found`);
    if (footerResults.invalid.length > 0) {
      console.log(`    ❌ Invalid: ${footerResults.invalid.join(', ')}`);
      totalErrors += footerResults.invalid.length;
    } else {
      console.log(`    ✅ All footer links valid`);
    }
  } else {
    console.log(`  ⚠️  No footer found`);
    totalErrors++;
  }
  
  // Check back navigation
  if (page !== 'index.html' && page !== 'blog.html' && page !== 'templates.html') {
    if (html.includes('Back to Home') || html.includes('back to home')) {
      if (html.includes('href="index.html"')) {
        console.log(`  ✅ Back navigation present and valid`);
      } else {
        console.log(`  ❌ Back navigation text found but link is incorrect`);
        totalErrors++;
      }
    } else {
      console.log(`  ⚠️  No back navigation found`);
    }
  }
  
  console.log('');
});

console.log('='.repeat(80));
console.log(`SUMMARY: ${totalErrors > 0 ? totalErrors + ' errors found' : 'All links verified ✅'}`);
console.log('='.repeat(80));

process.exit(totalErrors > 0 ? 1 : 0);
