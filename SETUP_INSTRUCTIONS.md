# Navik - Setup Instructions

## Current Issue

You're seeing a file directory because the files are being opened as `file://` protocol, which doesn't support URL parameters properly.

## Solution: Use Hash-Based Routing

The product pages now use **hash-based routing** which works perfectly with file:// protocol!

### **New Product Page URLs:**

Instead of `?product=hr-system`, use the hash format:

```
file:///C:/Users/kartikey%20mishra/Downloads/NAVIK/index.html#/hr-system
file:///C:/Users/kartikey%20mishra/Downloads/NAVIK/index.html#/payroll-system
file:///C:/Users/kartikey%20mishra/Downloads/NAVIK/index.html#/workforce-management
```

Or simply click the footer "Product" links which now use `#/product-name` format.

### **How to Test:**

1. **Open index.html** in your browser
2. **Scroll to footer** and click on any "Product" link
3. The page will dynamically load that product's content
4. Click "Back to Home" to return to the homepage

### **Footer Product Links (Updated):**

All footer links now use:
- `#/hr-system`
- `#/workforce-management`
- `#/payroll-system`
- `#/attendance`
- `#/contract-workforce`
- `#/field-workforce-tracking`
- `#/employee-self-service`
- `#/compliance-management`
- `#/reports-analytics`

## How It Works

The `product-router.js` script:
1. Detects hash changes (e.g., `#/hr-system`)
2. Reads the product name from the hash
3. Hides all homepage sections
4. Dynamically renders the product page
5. Shows proper navigation

## Option 2: Use a Local Web Server (Recommended for Production)

### **Using Python (if installed):**

```bash
cd C:\Users\kartikey mishra\Downloads\NAVIK
python -m http.server 8000
```

Then open: `http://localhost:8000`

### **Using Node.js (if you have npm installed):**

```bash
cd C:\Users\kartikey mishra\Downloads\NAVIK
npx http-server
```

### **Using Live Server in VS Code:**

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Automatically opens at `http://localhost:5500`

## File Structure

```
NAVIK/
├── index.html                    (main landing page)
├── product-router.js             (product page routing logic)
├── main.js                       (existing scripts)
├── Styles.css                    (styling)
├── package.json                  (npm config)
├── hr-system.html               (optional, for SEO)
├── payroll-system.html          (optional, for SEO)
├── attendance.html              (optional, for SEO)
├── workflow-management.html     (optional, for SEO)
├── contract-workforce.html      (optional, for SEO)
├── field-workforce-tracking.html (optional, for SEO)
├── employee-self-service.html   (optional, for SEO)
├── compliance-management.html   (optional, for SEO)
├── reports-analytics.html       (optional, for SEO)
└── [other files]
```

## Testing Product Pages

### **Via Hash URLs (Works with file://):**
```
#/hr-system
#/payroll-system
#/attendance
#/workforce-management
#/contract-workforce
#/field-workforce-tracking
#/employee-self-service
#/compliance-management
#/reports-analytics
```

### **Via Footer Links:**
Simply scroll to the footer and click any product link!

## Troubleshooting

### **Pages not loading?**

1. ✅ Ensure `product-router.js` is in the same folder as `index.html`
2. ✅ Check browser console for errors (F12 → Console tab)
3. ✅ Clear browser cache (Ctrl+Shift+Delete)
4. ✅ Try a different browser

### **Links not working?**

1. ✅ Make sure you're using hash format: `#/product-name`
2. ✅ Check product names are spelled correctly
3. ✅ Use footer links which are pre-configured

### **Want query parameters instead of hash?**

Use a web server (Python/Node.js) instead of opening as file.

## Next Steps

1. **Test the links** - Click footer Product links to verify
2. **For local development** - Use Live Server or Python HTTP server
3. **For production** - Deploy to actual web server
4. **Add content** - Replace lorem ipsum with real descriptions
5. **Customize styling** - Update colors and fonts in product-router.js

## File Changes Made

### **product-router.js** (NEW)
- Contains all 9 product data
- Handles hash-based routing
- Dynamically renders product pages
- Responds to hash change events

### **index.html** (MODIFIED)
- Added: `<script src="product-router.js"></script>`
- Updated footer links to use `#/` format
- Ready for hash-based navigation

## Quick Start

1. Open `index.html` in your browser
2. Scroll to footer
3. Click any "Product" link
4. Product page loads dynamically!

---

**Status:** ✅ Ready to Use
**Version:** 2.0 (Hash-based routing)
**Last Updated:** June 2026

Now works with both file:// protocol and web servers!
