# QA Testing Guide - NAVIK Production Deployment

## Quick Test Cases

### 1. FUNCTIONAL TESTING

#### Homepage (index.html)
- [ ] Page loads without errors (check Console)
- [ ] Navigation bar responsive on mobile (375px)
- [ ] All internal links working (Home, Products, Pricing, Contact)
- [ ] CTA buttons clickable ("Book Demo", "Get Started")
- [ ] Product dropdown menu expands and collapses
- [ ] Social media links open in new tabs with rel="noopener noreferrer"
- [ ] Footer links all active and correct
- [ ] Forms submit properly

#### Product Pages (workforce-management.html, payroll-system.html, etc.)
- [ ] Hero title and subtitle centered
- [ ] Hero subtitle text properly aligned with heading
- [ ] "Book Demo" button functional
- [ ] "Back to Home" button returns to homepage
- [ ] Product images load (from Cloudinary)
- [ ] Feature cards display correctly in grid
- [ ] Benefits section formatting correct
- [ ] CTA section buttons working

#### About Us (about-us.html)
- [ ] Mission section displays correctly
- [ ] Footer logo is white (not gradient)
- [ ] All footer links present and working
- [ ] Social media icons display correctly
- [ ] Text alignment centered

#### Contact Us (contact-us.html)
- [ ] Contact form renders properly
- [ ] Form fields have proper labels
- [ ] Form submission works (check email received)
- [ ] Contact info displays correctly
- [ ] Phone number clickable (tel: link)
- [ ] Email links functional (mailto:)
- [ ] Google Maps link working

#### Blog (blog.html)
- [ ] Blog posts load correctly
- [ ] Blog modal functionality working
- [ ] Navigation working in blog view
- [ ] Social sharing icons present

---

### 2. RESPONSIVE TESTING

Test at these breakpoints:
- [ ] **Mobile** (375px): All content readable, buttons clickable
- [ ] **Tablet** (768px): Layout proper, no horizontal scroll
- [ ] **Laptop** (1024px): Desktop layout correct
- [ ] **Desktop** (1920px): Content not too wide, readable

Use browser DevTools to test:
```
Mobile: Ctrl+Shift+I → Ctrl+Shift+M → Select iPhone 12
Tablet: Change to iPad
Desktop: Change to MacBook
```

---

### 3. PERFORMANCE TESTING

#### Check Page Load Time
```
Open DevTools → Network Tab
Reload page → Check:
  - Total size < 3MB
  - Load time < 3 seconds
  - No failed resources (red items)
```

#### Core Web Vitals
```
Use Google PageSpeed Insights:
  1. Visit: https://pagespeed.web.dev/
  2. Enter URL: https://navik.in (or your domain)
  3. Check scores:
     - LCP (Largest Contentful Paint): < 2.5s
     - FID (First Input Delay): < 100ms
     - CLS (Cumulative Layout Shift): < 0.1
```

#### Console Errors Check
```
Open DevTools → Console
Reload page → Should show:
  - 0 errors
  - 0 critical warnings
```

---

### 4. SEO TESTING

#### Meta Tags
```
Right-click page → View Page Source
Verify present:
  [ ] <title> tag (50-65 characters)
  [ ] <meta name="description"> (150-160 characters)
  [ ] <meta name="keywords"> (relevant keywords)
  [ ] <meta name="viewport" content="width=device-width, initial-scale=1.0">
  [ ] <link rel="canonical" href="https://navik.in/...">
```

#### Social Sharing
```
Test each page:
  [ ] Share on LinkedIn: Check preview image and text
  [ ] Share on Twitter: Check card format
  [ ] Share on Facebook: Check thumbnail and description
  
Use: https://www.linkedin.com/feed/ (copy URL in post)
```

#### Google PageSpeed Insights
```
Visit: https://pagespeed.web.dev/
Test each main page:
  [ ] index.html
  [ ] about-us.html
  [ ] contact-us.html
  [ ] blog.html
  [ ] workforce-management.html (product page)
```

#### Schema Markup Validation
```
Visit: https://schema.org/validator
Paste page source → Verify:
  [ ] SoftwareApplication schema (product pages)
  [ ] Organization schema (all pages)
  [ ] LocalBusiness schema (contact info)
  [ ] Blog schema (blog page)
```

---

### 5. ACCESSIBILITY TESTING

#### Keyboard Navigation
```
Press Tab through entire page → Verify:
  [ ] All buttons reachable
  [ ] Form fields focusable
  [ ] Focus indicator visible
  [ ] Tab order logical (left→right, top→bottom)
```

#### Screen Reader Testing (NVDA/JAWS)
```
Test with free tools:
  [ ] All images have alt text
  [ ] Links descriptive (not "click here")
  [ ] Form labels readable
  [ ] Headings hierarchical (H1→H2→H3)
```

#### Color Contrast
```
Use: https://webaim.org/resources/contrastchecker/
Check text contrast ratio:
  [ ] Black text on white: 21:1 ✅
  [ ] Blue text on white: 8.6:1 ✅
  [ ] Gray text: Must be ≥ 4.5:1
```

---

### 6. SECURITY TESTING

#### HTTPS & SSL
```
Check URL bar:
  [ ] Shows 🔒 padlock icon
  [ ] URL starts with https://
  [ ] No mixed content warning
```

#### External Links
```
Inspect external links:
  [ ] All have rel="noopener noreferrer"
  [ ] Open in new tabs
  [ ] Don't expose referrer info
```

#### Form Security
```
Test contact form:
  [ ] No sensitive data in URL parameters
  [ ] Uses POST method (not GET)
  [ ] CSRF token present (if applicable)
```

---

### 7. CROSS-BROWSER TESTING

Test on:
- [ ] Chrome (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)
- [ ] Edge (Latest)
- [ ] Mobile Chrome (iOS/Android)
- [ ] Mobile Safari (iOS)

Each browser should show:
- [ ] All content visible and readable
- [ ] No layout breaking
- [ ] All interactive elements working
- [ ] No JavaScript errors

---

### 8. LINK INTEGRITY TESTING

#### Check All Links Work
```
Use: https://validator.w3.org/checklink
Enter URL → Scan
Verify:
  [ ] 0 broken internal links
  [ ] 0 broken external links
  [ ] All anchors (#section) work
```

#### Specific Links to Test
- [ ] Navigation: Home, Products, About, Blog, Contact
- [ ] Product Pages: All 9 product links in footer
- [ ] Social: Instagram, YouTube, LinkedIn, Facebook
- [ ] CTA: All "Book Demo" buttons
- [ ] Footer: All company links
- [ ] Internal: Blog post links

---

### 9. IMAGE TESTING

#### Image Loading
```
Check each image loads:
  [ ] Logo (in header and footer)
  [ ] Hero images
  [ ] Product feature images
  [ ] Icons and graphics
  
Open DevTools → Network → Filter "img"
Verify all images successfully loaded (status 200)
```

#### Image Optimization
```
Check image sizes are optimized:
  [ ] Hero images < 500KB each
  [ ] Product images < 300KB each
  [ ] Icons < 50KB each
```

---

### 10. EMAIL FUNCTIONALITY

#### Contact Form
```
Test contact form submission:
  [ ] Fill all fields
  [ ] Submit form
  [ ] Check email received within 5 minutes
  [ ] Email contains all submitted data
  [ ] Email has proper formatting
```

#### Newsletter Signup (if present)
```
Test newsletter signup:
  [ ] Form accepts valid email
  [ ] Form rejects invalid email
  [ ] Confirmation email received
```

---

## CRITICAL ISSUES THAT BLOCK DEPLOYMENT

**DO NOT DEPLOY if any of these fail:**

1. ❌ Any page throws JavaScript errors in console
2. ❌ Any internal link returns 404
3. ❌ Page load time > 5 seconds
4. ❌ Mobile layout broken (horizontal scroll, overlapping elements)
5. ❌ Form submission not working
6. ❌ HTTPS certificate error
7. ❌ No title or description tags
8. ❌ Images not loading from Cloudinary
9. ❌ Navigation broken on any page
10. ❌ External links redirect to error pages

---

## MINOR ISSUES (Can be fixed post-launch)

- [ ] Slight color differences in different browsers
- [ ] Minor spacing differences on very old browsers
- [ ] Non-critical console warnings
- [ ] PageSpeed score < 80 (target 90+)
- [ ] Some SVG icons need ARIA labels

---

## TEST RESULTS TEMPLATE

```
Date: [MM/DD/YYYY]
Tester: [Name]
Environment: [Staging/Production]
Browser: [Chrome/Firefox/Safari/Edge]
Device: [Desktop/Mobile/Tablet]

TESTS PASSED: ✅ XX/XX
TESTS FAILED: ❌ XX/XX
BLOCKING ISSUES: 0
MINOR ISSUES: XX

Issues Found:
1. [Issue description]
2. [Issue description]

Sign-off: [Approved/Needs Fixes]
```

---

## QUICK COMMANDS FOR TESTING

### Check for broken links
```bash
npm install -g broken-link-checker
broken-link-checker https://navik.in
```

### Validate HTML
```bash
# Online: https://validator.w3.org/
# Or use offline tool
npm install -g html-validate
html-validate *.html
```

### Check performance
```bash
# Use Lighthouse in Chrome DevTools
# Or visit: https://pagespeed.web.dev/
```

---

**Questions about testing?** Check individual page documentation or audit logs.
