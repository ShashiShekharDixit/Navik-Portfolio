# NAVIK - Clean URL Mapping Reference

## Complete URL Mapping (Old .html → New Clean URLs)

### Main Pages
| Old URL | New Clean URL | File |
|---------|---------------|------|
| /index.html | / | index.html |
| / | / | index.html |

### Product Pages
| Old URL | New Clean URL | File |
|---------|---------------|------|
| /hr-system.html | /hr-system | hr-system.html |
| /workforce-management.html | /workforce-management | workforce-management.html |
| /payroll-system.html | /payroll-system | payroll-system.html |
| /attendance.html | /attendance | attendance.html |
| /contract-workforce.html | /contract-workforce | contract-workforce.html |
| /field-workforce-tracking.html | /field-workforce-tracking | field-workforce-tracking.html |
| /employee-self-service.html | /employee-self-service | employee-self-service.html |

### Compliance & Reporting
| Old URL | New Clean URL | File |
|---------|---------------|------|
| /complience-managemant.html | /compliance | complience-managemant.html |
| /reports-analytics.html | /reports | reports-analytics.html |

### Templates & Resources
| Old URL | New Clean URL | File |
|---------|---------------|------|
| /templates.html | /templates | templates.html |
| /blog.html | /blog | blog.html |

### Tool Pages
| Old URL | New Clean URL | File |
|---------|---------------|------|
| /tool-salary-calculator.html | /salary-calculator | tool-salary-calculator.html |
| /tool-income-tax.html | /income-tax-calculator | tool-income-tax.html |
| /tool-gratuity.html | /gratuity-calculator | tool-gratuity.html |
| /tool-epf.html | /epf-calculator | tool-epf.html |
| /tool-fuel-cost.html | /fuel-cost-calculator | tool-fuel-cost.html |
| /tool-leave-tracker.html | /leave-tracker | tool-leave-tracker.html |
| /tools-hub.html | /tools | tools-hub.html |
| /hr-tools.html | /hr-tools | hr-tools.html |

### Company Pages
| Old URL | New Clean URL | File |
|---------|---------------|------|
| /about-us.html | /about | about-us.html |
| /contact-us.html | /contact | contact-us.html |

### Utility Pages
| Old URL | New Clean URL | File |
|---------|---------------|------|
| /dashboard.html | /dashboard | dashboard.html |
| /compliance-management.html | /compliance-management | compliance-management.html |

## Redirect Rules in .htaccess

All old .html URLs automatically redirect to clean URLs via:
```
RewriteRule ^(.+)\.html$ /$1 [R=301,L]
```

## Examples

### Before (Old URLs)
```
https://navikops.com/index.html
https://navikops.com/hr-system.html
https://navikops.com/payroll-system.html
https://navikops.com/about-us.html
https://navikops.com/contact-us.html
https://navikops.com/tool-salary-calculator.html
https://navikops.com/blog.html
```

### After (Clean URLs)
```
https://navikops.com/
https://navikops.com/hr-system
https://navikops.com/payroll-system
https://navikops.com/about
https://navikops.com/contact
https://navikops.com/salary-calculator
https://navikops.com/blog
```

## Internal Link Updates

All `href` attributes in HTML files have been updated:

### Example Conversions
```html
<!-- Before -->
<a href="index.html">Home</a>
<a href="hr-system.html">HR System</a>
<a href="/about-us.html">About</a>

<!-- After -->
<a href="/">Home</a>
<a href="/hr-system">HR System</a>
<a href="/about">About</a>
```

## Canonical Tags

All canonical tags updated to use clean URLs:
```html
<!-- Before -->
<link rel="canonical" href="https://navikops.com/hr-system.html" />

<!-- After -->
<link rel="canonical" href="https://navikops.com/hr-system" />
```

## Testing Checklist

- [ ] Old URLs with .html extension redirect to clean URLs
- [ ] Clean URLs load correctly without .html
- [ ] No redirect loops
- [ ] Browser refresh works on clean URLs
- [ ] All internal links work
- [ ] Canonical tags are correct
- [ ] Sitemap.xml has clean URLs
- [ ] robots.txt is updated
- [ ] Analytics tracking unchanged

## Notes

1. **Backward Compatibility**: All old .html URLs are automatically redirected via 301 (permanent redirect) to the new clean URLs. This preserves SEO value and doesn't break existing bookmarks or links.

2. **Browser Refresh**: .htaccess rules ensure that clean URLs remain clean after page refresh.

3. **Query Parameters**: Query parameters are preserved through rewrites (e.g., `/hr-system?section=features`)

4. **Static Assets**: CSS, JS, and images are not affected - they keep their original paths.

5. **Performance**: Clean URLs reduce bandwidth usage and improve readability in browser history.

## Deployment

1. Upload updated `.htaccess` to root
2. Verify all links in HTML files are using clean URLs
3. Test old .html URLs redirect correctly
4. Monitor 404 errors and server logs for issues
5. Update Search Console canonical URL preferences

