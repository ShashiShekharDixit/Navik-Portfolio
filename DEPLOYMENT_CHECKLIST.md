# NAVIK Clean URL Deployment Checklist

## Pre-Deployment (Local Environment)

### Code Review
- [x] All HTML files contain clean URLs in links
- [x] .htaccess rewrite rules are correct
- [x] No hardcoded .html references in navigation
- [x] Canonical tags updated
- [x] All tool pages sidebar links updated

### Testing
- [x] Verified clean URLs load correctly
- [x] Verified old .html URLs redirect (simulated)
- [x] Checked for broken link references
- [x] Verified query parameters work
- [x] Checked active states on tool pages

---

## Deployment Steps

### 1. Backup Current Files
```bash
# Create backup directory
mkdir backups/
date_stamp=$(date +%Y%m%d_%H%M%S)

# Backup critical files
cp .htaccess backups/.htaccess.backup.$date_stamp
cp index.html backups/index.html.backup.$date_stamp
cp hr-system.html backups/hr-system.html.backup.$date_stamp
# ... backup all other HTML files ...
```

### 2. Upload Files to Server

**Critical File (Must Upload):**
- [ ] `.htaccess` - Place in root directory

**HTML Files (Update):**
- [ ] `index.html`
- [ ] `hr-system.html`
- [ ] `workforce-management.html`
- [ ] `payroll-system.html`
- [ ] `attendance.html`
- [ ] `contract-workforce.html`
- [ ] `field-workforce-tracking.html`
- [ ] `employee-self-service.html`
- [ ] `complience-managemant.html`
- [ ] `reports-analytics.html`
- [ ] `templates.html`
- [ ] `about-us.html`
- [ ] `contact-us.html`
- [ ] `blog.html`
- [ ] `tool-salary-calculator.html`
- [ ] `tool-income-tax.html`
- [ ] `tool-gratuity.html`
- [ ] `tool-epf.html`
- [ ] `tool-fuel-cost.html`
- [ ] `tool-leave-tracker.html`
- [ ] `tools-hub.html`

### 3. Verify .htaccess Permissions
```bash
# Set correct permissions on .htaccess
chmod 644 .htaccess

# Verify it's readable
ls -la .htaccess
```

### 4. Clear Caches
- [ ] Clear CDN cache (if using CloudFlare, CloudFront, etc.)
- [ ] Clear server cache (if applicable)
- [ ] Instruct users to clear browser cache
- [ ] Clear any application cache

### 5. Test URLs on Live Server

**Homepage:**
- [ ] `https://yourdomain.com/` loads correctly
- [ ] `https://yourdomain.com/index.html` redirects to `/`

**Product Pages:**
- [ ] `https://yourdomain.com/hr-system` loads
- [ ] `https://yourdomain.com/hr-system.html` redirects to `/hr-system`
- [ ] `https://yourdomain.com/payroll-system` loads
- [ ] `https://yourdomain.com/payroll-system.html` redirects

**Tool Pages:**
- [ ] `https://yourdomain.com/salary-calculator` loads
- [ ] `https://yourdomain.com/tool-salary-calculator.html` redirects
- [ ] `https://yourdomain.com/income-tax-calculator` loads
- [ ] Tool page sidebars show correct active state

**Navigation Testing:**
- [ ] All navbar links work
- [ ] All footer links work
- [ ] All tool sidebar links work
- [ ] Logo returns to homepage

**Query Parameters:**
- [ ] `https://yourdomain.com/hr-system?section=features` works
- [ ] `https://yourdomain.com/payroll-system?tab=overview` works

---

## Post-Deployment Verification

### Immediate Checks (First Hour)
- [ ] No 500 errors on main pages
- [ ] Clean URLs display in browser address bar
- [ ] Navigation works across all pages
- [ ] Forms still submit correctly
- [ ] External integrations functioning

### Server Logs Review
- [ ] Check `/var/log/apache2/error.log` for errors
- [ ] Check `/var/log/apache2/access.log` for 404s
- [ ] Verify no rewrite loop errors
- [ ] Confirm redirects are being sent (HTTP 301)

### SEO & Analytics
- [ ] Google Analytics still tracking
- [ ] Facebook Pixel still firing
- [ ] Email tracking (if used) working
- [ ] Hotjar/Heatmap tracking working
- [ ] Event tracking unchanged

### Search Console
- [ ] Update canonical URLs if needed
- [ ] Request re-crawl of homepage
- [ ] Monitor for crawl errors
- [ ] Check for redirect chains

### Browser Compatibility
- [ ] Test Chrome (latest)
- [ ] Test Firefox (latest)
- [ ] Test Safari (latest)
- [ ] Test Edge (latest)
- [ ] Test on Mobile (iOS/Android)

---

## Monitoring for 24 Hours

### Server Health
- [ ] CPU usage normal
- [ ] Memory usage normal
- [ ] Disk usage normal
- [ ] Server response time acceptable

### Error Monitoring
- [ ] Monitor 404 errors
- [ ] Monitor 500 errors
- [ ] Monitor redirect chains
- [ ] Monitor slow pages

### Traffic Monitoring
- [ ] Monitor bounce rate
- [ ] Monitor page load times
- [ ] Monitor user flow
- [ ] Monitor conversion funnel

### Known Issues Log
```
Time  | Issue | Status | Action
------|-------|--------|--------
      |       |        |
      |       |        |
      |       |        |
```

---

## Rollback Plan (If Needed)

### Quick Rollback (Within 1 Hour)

```bash
# Restore .htaccess
cp backups/.htaccess.backup.$date_stamp .htaccess

# Restore HTML files
cp backups/index.html.backup.$date_stamp index.html
cp backups/hr-system.html.backup.$date_stamp hr-system.html
# ... restore all other files ...

# Clear cache
sudo service apache2 reload
```

### Steps to Rollback
1. [ ] Stop accepting new traffic if possible
2. [ ] Restore .htaccess from backup
3. [ ] Restore HTML files from backup
4. [ ] Clear server cache
5. [ ] Restart web server
6. [ ] Test old .html URLs work
7. [ ] Notify stakeholders
8. [ ] Investigate root cause

### Post-Rollback
- [ ] Document what went wrong
- [ ] Review logs for errors
- [ ] Fix issues in development
- [ ] Re-test before re-deploying

---

## Communication Plan

### Notify Stakeholders
- [ ] Send deployment notice to team
- [ ] Update status page
- [ ] Prepare rollback communication
- [ ] Plan post-deployment review

### User Communication (If Needed)
- [ ] Email: "Website URL structure updated"
- [ ] Blog post: "Improved web address format"
- [ ] FAQ: "Where did the .html go?"

### Feedback Collection
- [ ] Set up support email for issues
- [ ] Monitor social media for feedback
- [ ] Track bug reports
- [ ] Collect user suggestions

---

## Sign-Off Checklist

### Technical Lead
- [ ] Code review complete: __________ Date: __________
- [ ] Testing verified: __________ Date: __________
- [ ] Deployment approved: __________ Date: __________

### Product/Project Manager
- [ ] Business requirements met: __________ Date: __________
- [ ] No customer-impacting issues: __________ Date: __________
- [ ] Approval to deploy: __________ Date: __________

### Operations/DevOps
- [ ] Server readiness verified: __________ Date: __________
- [ ] Monitoring configured: __________ Date: __________
- [ ] Rollback plan in place: __________ Date: __________

---

## Deployment Timeline

| Task | Duration | Responsible | Status |
|------|----------|-------------|--------|
| Pre-deployment testing | 30 min | Tech Lead | [ ] |
| File backup | 15 min | DevOps | [ ] |
| File upload | 20 min | DevOps | [ ] |
| Cache clear | 10 min | DevOps | [ ] |
| URL testing | 30 min | QA | [ ] |
| Log review | 15 min | Operations | [ ] |
| SEO verification | 20 min | Marketing | [ ] |
| 24-hour monitoring | 24 hours | Operations | [ ] |
| **Total** | **~2.5 hours** | **Team** | |

---

## Success Criteria

✅ Deployment is successful if:

- All clean URLs load without errors
- Old .html URLs redirect with 301
- No increase in 404 errors
- No increase in server errors
- Analytics continue to track
- Page load times unchanged
- All navigation functional
- Search engines can crawl new URLs

❌ Deployment needs rollback if:

- Critical errors on main pages
- Significant traffic drop
- Broken navigation
- Database connectivity issues
- External integrations fail

---

## Post-Deployment Report

### Deployment Completion
- Deployed by: _________________ Date: _________
- Time completed: _________________
- Issues encountered: _________________________
- Resolution taken: ___________________________

### Performance Metrics (24 hours)
- Average page load time: _________ ms
- Error rate: _________ %
- Traffic: _________ (↑/↓/—)
- Bounce rate: _________ %

### Issues Resolved
- [ ] None (Perfect deployment!)
- [ ] Minor issues - all resolved
- [ ] Major issues - rollback executed

### Next Steps
- [ ] Monitor for 7 days
- [ ] Update documentation
- [ ] Schedule retrospective
- [ ] Plan URL structure for future growth

---

## Approval Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Technical Lead | __________ | __________ | __________ |
| Project Manager | __________ | __________ | __________ |
| DevOps Lead | __________ | __________ | __________ |

---

**Deployment Status**: [ ] NOT DEPLOYED  [ ] IN PROGRESS  [ ] COMPLETED  [ ] ROLLED BACK

**Date of Deployment**: _______________________

**Deployment Notes**: ___________________________________________________________

