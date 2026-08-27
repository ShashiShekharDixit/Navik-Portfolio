# 📋 PRODUCTION DEPLOYMENT CHECKLIST - NAVIK

**Project**: NAVIK HRMS & Payroll Management  
**Domain**: https://navikops.com  
**Status**: ✅ READY FOR DEPLOYMENT  
**Last Updated**: June 29, 2026

---

## ✅ PRE-DEPLOYMENT VERIFICATION (Do This First)

### Code Quality Checks
- [ ] All HTML files validated
- [ ] No /https:// malformed URLs (checked ✅)
- [ ] All canonical URLs correct
- [ ] All external links functional
- [ ] All CSS files present
- [ ] All JavaScript files present
- [ ] .htaccess file created (checked ✅)

### Security Verification
- [ ] External links have rel="noopener noreferrer"
- [ ] No sensitive files exposed
- [ ] HTTPS URLs only
- [ ] Security headers configured in .htaccess

### Link Testing
- [ ] Internal links start with / (e.g., /about-us)
- [ ] External links are full URLs (e.g., https://youtube.com)
- [ ] Mailto links correct (no leading /)
- [ ] Anchor links correct (e.g., #pricing, #demo)

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Pre-Deployment Checklist (24 hours before)

**Server Requirements Check:**
- [ ] DNS A record points to server IP
- [ ] SSL certificate installed for navikops.com
- [ ] Server supports Apache with mod_rewrite
- [ ] FTP/SFTP access verified
- [ ] Backup of current site created (if updating)

**Local Verification:**
- [ ] All files are UTF-8 encoded
- [ ] No Windows line endings (use Unix: LF)
- [ ] File names are lowercase
- [ ] No special characters in file names

**Environment Setup:**
- [ ] PHP/Node.js (if needed) configured
- [ ] Database connections configured (if needed)
- [ ] Email service configured (if needed)
- [ ] CDN configured (if using)

---

### Step 2: File Upload

**Upload Order** (important for consistency):

1. **Configuration Files** (Upload First):
   - [ ] .htaccess → `/public_html/.htaccess` **CRITICAL**
   - [ ] Set permissions: 644

2. **CSS Files**:
   - [ ] Styles.css → `/public_html/`
   - [ ] premium-upgrade.css → `/public_html/`
   - [ ] about-us.css → `/public_html/`
   - [ ] blog-page.css → `/public_html/`
   - [ ] contact-us.css → `/public_html/`
   - [ ] templates-page.css → `/public_html/`
   - [ ] product-pages.css → `/public_html/`
   - [ ] Set permissions: 644

3. **JavaScript Files**:
   - [ ] main.js → `/public_html/`
   - [ ] blog-router.js → `/public_html/`
   - [ ] blog-hash-router.js → `/public_html/`
   - [ ] blog-modal.js → `/public_html/`
   - [ ] product-router.js → `/public_html/`
   - [ ] google-apps-script.js → `/public_html/`
   - [ ] Set permissions: 644

4. **HTML Files** (Upload Last - in groups of 5):
   - **Group 1** (Main Pages):
     - [ ] index.html → `/public_html/`
     - [ ] about-us.html → `/public_html/`
     - [ ] contact-us.html → `/public_html/`
     - [ ] blog.html → `/public_html/`
     - [ ] workforce-management.html → `/public_html/`
   
   - **Group 2** (Product Pages):
     - [ ] hr-system.html → `/public_html/`
     - [ ] payroll-system.html → `/public_html/`
     - [ ] attendance.html → `/public_html/`
     - [ ] field-workforce-tracking.html → `/public_html/`
     - [ ] contract-workforce.html → `/public_html/`
   
   - **Group 3** (Product Pages Continued):
     - [ ] employee-self-service.html → `/public_html/`
     - [ ] compliance-management.html → `/public_html/`
     - [ ] complience-managemant.html → `/public_html/`
     - [ ] reports-analytics.html → `/public_html/`
     - [ ] templates.html → `/public_html/`
   
   - **Group 4** (Additional Pages):
     - [ ] dashboard.html → `/public_html/`
     - [ ] multipunch_section.html → `/public_html/`
   
   - Set permissions: 644

**File Permissions** (After Upload):
```bash
# Files: 644
chmod 644 /public_html/*.html
chmod 644 /public_html/*.css
chmod 644 /public_html/*.js
chmod 644 /public_html/.htaccess

# Directories: 755
chmod 755 /public_html/
```

---

### Step 3: Post-Upload Verification

**Critical Tests** (Do immediately after upload):

1. **Homepage Test**:
   - [ ] https://navikops.com/ loads
   - [ ] All images load
   - [ ] CSS styling correct
   - [ ] JavaScript works (check console)
   - [ ] No 404 errors

2. **Clean URLs Test**:
   - [ ] https://navikops.com/about-us works
   - [ ] https://navikops.com/contact-us works
   - [ ] https://navikops.com/blog works
   - [ ] https://navikops.com/workforce-management works

3. **Old URL Redirects** (Should get 301 redirected):
   - [ ] https://navikops.com/about-us.html → /about-us
   - [ ] https://navikops.com/contact-us.html → /contact-us
   - [ ] https://navikops.com/blog.html → /blog
   - [ ] https://navikops.com/index.html → /

4. **Link Testing**:
   - [ ] Navigation links work
   - [ ] Footer links work
   - [ ] External links work (YouTube, Instagram, WhatsApp)
   - [ ] Mailto links work
   - [ ] CTA buttons work
   - [ ] Anchor links work (#pricing, #demo, etc)

5. **Browser Console** (Press F12):
   - [ ] No 404 errors
   - [ ] No security warnings
   - [ ] No mixed content warnings
   - [ ] No CORS errors

6. **Mobile Responsiveness**:
   - [ ] Mobile menu works
   - [ ] Layout responsive on small screens
   - [ ] Touch interactions work
   - [ ] Forms work on mobile

---

### Step 4: SEO & Metadata Verification

**Meta Tags Check**:
- [ ] Open Graph tags present
- [ ] Twitter Cards present
- [ ] Canonical URLs correct
- [ ] Schema markup valid
- [ ] Title tags present on all pages
- [ ] Meta descriptions present

**Check Using Browser DevTools**:
```html
<!-- Should see in <head> -->
<link rel="canonical" href="https://navikops.com/..." />
<meta property="og:url" content="https://navikops.com/..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
```

**Structured Data Validation**:
- [ ] Test homepage with Google's Structured Data Testing Tool
- [ ] Verify Organization schema
- [ ] Verify SoftwareApplication schema
- [ ] Verify LocalBusiness schema

---

### Step 5: Performance Verification

**Page Load Performance**:
- [ ] Homepage loads in < 3 seconds
- [ ] No render-blocking resources
- [ ] Images optimized
- [ ] CSS minified (verify in DevTools)
- [ ] JavaScript deferred (check Network tab)

**Test Using**:
- [ ] Chrome DevTools Lighthouse
- [ ] Google PageSpeed Insights
- [ ] GTmetrix

**Performance Targets**:
- [ ] Lighthouse Score: 75+
- [ ] First Contentful Paint: < 2 seconds
- [ ] Largest Contentful Paint: < 3 seconds

---

### Step 6: Security Verification

**Security Headers Check**:
- [ ] X-Frame-Options present
- [ ] X-Content-Type-Options: nosniff
- [ ] X-XSS-Protection present
- [ ] Referrer-Policy configured
- [ ] No sensitive files exposed

**Check Using**:
- [ ] curl -I https://navikops.com
- [ ] Security headers checker tools
- [ ] Browser DevTools Network tab

**SSL Certificate**:
- [ ] Valid HTTPS certificate
- [ ] No certificate warnings
- [ ] Certificate not expired
- [ ] Mixed content warnings: NONE

---

### Step 7: Analytics & Monitoring Setup

**Google Search Console**:
- [ ] Domain added
- [ ] DNS verification complete
- [ ] Sitemap submitted
- [ ] URL inspection working
- [ ] Coverage report checked

**Google Analytics**:
- [ ] Tracking code present
- [ ] Events tracking configured
- [ ] Goals set up
- [ ] Conversion tracking configured

**Monitoring**:
- [ ] 404 monitoring enabled
- [ ] Performance monitoring enabled
- [ ] Error tracking enabled
- [ ] Uptime monitoring configured

---

### Step 8: Functional Testing

**Navigation Testing**:
- [ ] Home link works (/)
- [ ] Products dropdown works
- [ ] All product pages accessible
- [ ] Blog page loads
- [ ] Resources dropdown works
- [ ] Company dropdown works

**Forms Testing** (if applicable):
- [ ] Contact form submits
- [ ] Demo form submits
- [ ] No console errors
- [ ] Success messages show

**Interactive Elements**:
- [ ] Modals open/close
- [ ] Tabs switch
- [ ] Animations smooth
- [ ] Hover states work

---

### Step 9: Third-Party Integration Testing

**External Services**:
- [ ] YouTube embeds work
- [ ] Social media links functional
- [ ] WhatsApp chat widget works
- [ ] Email signup works (if applicable)
- [ ] Payment integration works (if applicable)

---

### Step 10: Final Sanity Check

**URLs to Test Manually**:

1. Homepage:
   - [ ] https://navikops.com/
   - [ ] https://navikops.com (without trailing slash)

2. Main Pages:
   - [ ] https://navikops.com/about-us
   - [ ] https://navikops.com/contact-us
   - [ ] https://navikops.com/blog
   - [ ] https://navikops.com/workforce-management
   - [ ] https://navikops.com/templates

3. Product Pages:
   - [ ] https://navikops.com/product/hr-system (if using /product/ prefix)
   - [ ] https://navikops.com/hr-system (if direct)

4. Old URLs (should redirect):
   - [ ] https://navikops.com/index.html → /
   - [ ] https://navikops.com/about-us.html → /about-us

5. Anchors (should jump to section):
   - [ ] https://navikops.com/#pricing
   - [ ] https://navikops.com/#demo
   - [ ] https://navikops.com/#trust

---

## ⚠️ CRITICAL FILES FOR DEPLOYMENT

**DO NOT FORGET**:
1. ✅ **.htaccess** - Most important file (enables clean URLs)
2. ✅ **index.html** - Homepage
3. ✅ **Styles.css** - Main stylesheet
4. ✅ **main.js** - Main JavaScript file

---

## 🔧 TROUBLESHOOTING

### Issue: 404 Errors on all pages
**Solution**:
- Verify .htaccess is in `/public_html/`
- Check mod_rewrite is enabled: `a2enmod rewrite`
- Verify RewriteEngine is On in .htaccess
- Check file permissions (644)

### Issue: Clean URLs show .html in address bar
**Solution**:
- Verify .htaccess is uploaded
- Check if web server supports .htaccess
- Verify DirectoryIndex is set

### Issue: External links broken (404)
**Solution**:
- Verify links have `https://` (not `/https://`)
- Check for leading slashes on external URLs
- Test link directly in browser

### Issue: Page loads but styling broken
**Solution**:
- Verify Styles.css uploaded
- Check CSS file path in HTML
- Verify CSS permissions (644)
- Clear browser cache (Ctrl+F5)

### Issue: JavaScript not working
**Solution**:
- Verify main.js uploaded
- Check JavaScript file paths
- Check browser console for errors
- Verify JavaScript permissions (644)

---

## 📊 Post-Deployment Monitoring

**Day 1 (First 24 hours)**:
- [ ] Monitor 404 errors in analytics
- [ ] Check Google Search Console for errors
- [ ] Monitor uptime monitoring
- [ ] Review server logs for errors
- [ ] Test all major user flows

**Week 1**:
- [ ] Monitor ranking changes
- [ ] Check for crawl errors in GSC
- [ ] Review analytics traffic
- [ ] Check for security warnings
- [ ] Verify all links working

**Month 1**:
- [ ] Full performance audit
- [ ] SEO audit
- [ ] Security audit
- [ ] User experience review
- [ ] Conversion tracking review

---

## ✅ SIGN-OFF CHECKLIST

Before going live, verify:

- [ ] All files uploaded
- [ ] .htaccess permissions correct (644)
- [ ] HTML files permissions correct (644)
- [ ] No 404 errors on main pages
- [ ] Clean URLs working
- [ ] External links working
- [ ] Canonical URLs correct
- [ ] SSL certificate valid
- [ ] Mobile responsive
- [ ] Analytics tracking
- [ ] Search Console connected
- [ ] Performance acceptable

---

## 📞 SUPPORT CONTACTS

**If you need help:**

1. Check the troubleshooting section above
2. Review CRITICAL_FIXES_APPLIED.md
3. Check FINAL_DEPLOYMENT_READY.md
4. Review browser console errors (F12)
5. Check server logs

---

## 🎉 DEPLOYMENT COMPLETE!

Once all checks pass, your site is live at:  
**https://navikops.com**

---

**Deployment Started**: [Date/Time]  
**Deployment Completed**: [Date/Time]  
**Status**: ✅ LIVE

---

**Important**: Keep this checklist and reference documents for future updates!

