# Blog Backend Integration Guide

## Current Setup

The blog router currently uses **mock data** (6 sample posts) but is fully prepared for backend integration.

## Adding Real Blog Posts from Backend

### Step 1: Set Up Your Backend API

Your backend should provide an endpoint that returns blog posts in this format:

```json
{
  "success": true,
  "posts": [
    {
      "id": 1,
      "title": "How to Streamline HR Processes with Automation",
      "excerpt": "Discover how HR automation can save time...",
      "category": "hr-tips",
      "image": "https://your-cdn.com/blog1.jpg",
      "author": "Sarah Johnson",
      "date": "2026-06-25",
      "readTime": 5,
      "slug": "streamline-hr-processes",
      "content": "Full article content here..."
    },
    {
      "id": 2,
      "title": "Top 5 HR Trends in 2026",
      ...
    }
  ],
  "total": 25,
  "page": 1,
  "pageSize": 100
}
```

### Step 2: Update blog-router.js

Find the `fetchBlogPosts()` method in `blog-router.js` and replace the mock data section:

**BEFORE (Current Mock Data):**
```javascript
async fetchBlogPosts() {
  try {
    // Mock data structure - replace with your backend API
    const mockData = [
      {
        id: 1,
        title: 'How to Streamline HR Processes with Automation',
        ...
      },
      ...
    ];

    this.allPosts = mockData;
    this.filteredPosts = [...this.allPosts];
    this.renderBlogPosts();
```

**AFTER (Backend Integration):**
```javascript
async fetchBlogPosts() {
  try {
    // Fetch from your backend API
    const response = await fetch('/api/blog/posts?page=1&limit=100');
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    const data = await response.json();
    
    this.allPosts = data.posts || [];
    this.filteredPosts = [...this.allPosts];
    this.renderBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    this.showErrorMessage();
  }
}
```

### Step 3: Update Newsletter Subscription

Find the `handleNewsletterSignup()` method and uncomment the API call:

**BEFORE:**
```javascript
handleNewsletterSignup(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  // BACKEND INTEGRATION:
  // fetch('/api/newsletter/subscribe', {
  //   method: 'POST',
  //   ...
  // })

  console.log('Newsletter signup:', email);
  alert('Thank you for subscribing!');
  e.target.reset();
}
```

**AFTER:**
```javascript
handleNewsletterSignup(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  // Send to backend
  fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source: 'blog' })
  })
  .then(r => r.json())
  .then(data => {
    if (data.success) {
      alert('Thank you for subscribing!');
      e.target.reset();
    } else {
      alert('Subscription failed. Please try again.');
    }
  })
  .catch(err => {
    console.error('Newsletter signup error:', error);
    alert('An error occurred. Please try again.');
  });
}
```

## Blog Post Structure

Each blog post should have these required fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number | Yes | Unique identifier |
| title | string | Yes | Blog post title |
| excerpt | string | Yes | Short description (shown in card) |
| category | string | Yes | One of: `hr-tips`, `industry`, `product`, `case-studies` |
| image | string | Yes | URL to blog post image (400x240 recommended) |
| author | string | Yes | Author name |
| date | string | Yes | Publication date (YYYY-MM-DD format) |
| readTime | number | Yes | Estimated read time in minutes |
| slug | string | Yes | URL-friendly slug (e.g., "how-to-hire") |
| content | string | Yes | Full article content (for SEO/meta) |

## Available Categories

- `hr-tips` - HR Tips and Guides
- `industry` - Industry Updates and Trends
- `product` - Product Updates and Releases
- `case-studies` - Case Studies and Success Stories

## Backend Endpoints Needed

### 1. Get Blog Posts
```
GET /api/blog/posts
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 100)
  - category: string (optional, filter by category)
  - search: string (optional, search query)
```

### 2. Newsletter Subscribe
```
POST /api/newsletter/subscribe
Body:
{
  "email": "user@example.com",
  "source": "blog"
}
```

## Search & Filtering

The blog router handles search and filtering **on the client side**, so:

✅ **What works on client-side:**
- Filtering by category
- Searching by title/author/content
- Pagination
- Sorting

❌ **What needs backend:**
- Search on large datasets (500+ posts)
- Advanced filtering (date range, etc.)
- Personalized recommendations

## Example Implementation

If you're using Node.js/Express:

```javascript
// Backend - Express endpoint
app.get('/api/blog/posts', async (req, res) => {
  const { page = 1, limit = 100 } = req.query;
  
  try {
    // Fetch from database
    const posts = await BlogPost.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 })
      .lean();
    
    res.json({
      success: true,
      posts: posts,
      total: await BlogPost.countDocuments(),
      page,
      pageSize: limit
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Newsletter subscription
app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email, source } = req.body;
  
  try {
    // Save to database or email service
    await Newsletter.create({ email, source, subscribedAt: new Date() });
    
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## SEO Optimization

The blog router automatically adds:

✅ **Meta Tags:**
- `og:title`, `og:description`, `og:url`
- `twitter:card`, `twitter:title`, `twitter:description`

✅ **Schema Markup:**
- BlogPosting schema for each post
- Blog schema for the blog index page

✅ **Canonical URLs:**
- Proper canonical tags for blog posts

## Performance Tips

1. **Lazy Load Images:**
   ```javascript
   <img src="${post.image}" alt="${post.title}" loading="lazy">
   ```

2. **Pagination:**
   - Current: 9 posts per page
   - Can adjust in `blog-router.js`: `this.itemsPerPage = 9;`

3. **Caching:**
   - Consider caching blog posts for 1 hour
   - Refresh on publish

4. **CDN Images:**
   - Use CDN for blog post images (Cloudinary, S3, etc.)
   - Current setup already supports external URLs

## Migration from Mock Data

When ready to migrate:

1. ✅ Keep mock data in `BLOG_DATA` as backup
2. ✅ Deploy new blog-router with API calls
3. ✅ Verify API returns correct format
4. ✅ Test search and filtering
5. ✅ Monitor performance
6. ✅ Remove mock data if successful

## Troubleshooting Backend Integration

**Issue: Posts not loading**
- Check API response format
- Verify `/api/blog/posts` endpoint exists
- Check browser console for CORS errors

**Issue: Search not working**
- Ensure posts have `title`, `excerpt`, `author` fields
- Check search query is being sent to backend (if server-side)

**Issue: Newsletter signup fails**
- Verify email validation
- Check `/api/newsletter/subscribe` endpoint
- Add error handling in frontend

**Issue: Images not showing**
- Verify image URLs are accessible
- Check Content Security Policy (CSP) headers
- Use HTTPS URLs if possible

## Ready to Go! 🚀

Your blog is fully set up and ready to connect to a backend. Just follow the steps above and your blog will be live with real content!
