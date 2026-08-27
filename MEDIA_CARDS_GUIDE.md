# Customer Stories - Media Cards Guide

## ✅ All Bugs Fixed!

**What was fixed:**
- ✅ Removed conflicting static HTML cards
- ✅ Fixed photo display issues (added `type: 'photo'`)
- ✅ Fixed play button logic (no play button on photos/podcasts)
- ✅ Added error handling for empty states
- ✅ Added loading skeletons
- ✅ Fixed tab filtering with empty state messages
- ✅ Fixed grammar errors ("1 weeks" → "1 week")
- ✅ Added proper thumbnail fallbacks
- ✅ Improved click handling for photos vs videos

---

## Quick Reference: How to Add Cards

Open `main.js` and find the `MEDIA_CARDS` array (around line 430). Add your cards inside the array.

---

## 1. 📸 PHOTO CARD
Perfect for: Client meetings, events, team photos, office visits

```javascript
{
  type:        'photo',                                    // ← REQUIRED: marks as photo
  thumbnail:   'https://your-image-url.jpg',              // ← REQUIRED: image URL
  link:        'https://optional-link.com',               // optional: opens when clicked
  category:    'clients',                                 // clients | demos | podcasts
  label:       'Client Meet',                             // badge text on card
  title:       'Your Heading Here',                       // main heading
  description: 'Your caption here.',                      // description/subheading
  source:      'Company Name',                            // company/source name
  date:        'May 2026',                                // date text
},
```

**Example:**
```javascript
{
  type:        'photo',
  thumbnail:   'https://i.imgur.com/abc123.jpg',
  link:        null,  // no link = card won't be clickable
  category:    'clients',
  label:       'Client Visit',
  title:       'Meeting with ABC Corp Leadership Team',
  description: 'Discussing digital transformation initiatives.',
  source:      'ABC Corp',
  date:        'May 15, 2026',
},
```

---

## 2. 📱 INSTAGRAM REEL CARD
Perfect for: Instagram reels, client stories on Instagram

```javascript
{
  url:         'https://www.instagram.com/reel/REEL_ID/',  // ← REQUIRED: Instagram reel URL
  category:    'clients',                                  // clients | demos | podcasts
  label:       'Client Story',                             // badge text on card
  title:       'Your Heading Here',                        // main heading
  description: 'Your description here.',                   // description
  source:      'Company Name',                             // company/source name
  date:        'May 2026',                                 // date text
},
```

**Features:**
- ✅ Automatic Instagram gradient thumbnail
- ✅ Instagram logo icon (gradient)
- ✅ Special reel play button
- ✅ Opens Instagram when clicked

**Example:**
```javascript
{
  url:         'https://www.instagram.com/reel/DYWT7-NT-gR/',
  category:    'clients',
  label:       'Client Story',
  title:       'Success Story at ABC Jewellers',
  description: 'See how we transformed their workforce management.',
  source:      'ABC Jewellers',
  date:        '1 week ago',
},
```

---

## 3. 🎥 VIDEO CARD
Perfect for: YouTube videos, Vimeo, product demos

```javascript
{
  url:         'https://www.youtube.com/watch?v=YOUR_ID', // ← REQUIRED: video URL
  category:    'demos',                                   // clients | demos | podcasts
  label:       'Product Demo',                            // badge text on card
  title:       'Your Video Title',                        // main heading
  description: 'Short description.',                      // description
  source:      'navik',                                   // author/channel name
  date:        '1 week ago',                              // date text
  duration:    '4:32',                                    // optional: shown as badge
},
```

**Example:**
```javascript
{
  url:         'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  category:    'demos',
  label:       'Product Demo',
  title:       'navik Dashboard Walkthrough 2026',
  description: 'Complete overview of new features and capabilities.',
  source:      'navik',
  date:        '1 week ago',
  duration:    '12:45',
},
```

---

## 3. 📄 ARTICLE/URL CARD
Perfect for: Blog posts, case studies, news articles

```javascript
{
  url:         'https://example.com/article',             // ← REQUIRED: article URL
  category:    'clients',                                 // clients | demos | podcasts
  label:       'Case Study',                              // badge text on card
  title:       'Article Title',                           // auto-fetched if not provided
  description: 'Article description.',                    // auto-fetched if not provided
  source:      'Blog Name',                               // auto-fetched if not provided
  date:        '1 month ago',                             // auto-fetched if not provided
},
```

**Example:**
```javascript
{
  url:         'https://techcrunch.com/2026/05/navik-story',
  category:    'clients',
  label:       'Press Coverage',
  title:       'How navik is Revolutionizing Workforce Management',
  description: 'Featured in TechCrunch for innovative HR solutions.',
  source:      'TechCrunch',
  date:        'May 10, 2026',
},
```

---

## Categories

- **`clients`** - Client stories, testimonials, case studies
- **`demos`** - Product demos, feature showcases
- **`podcasts`** - Podcast episodes, interviews

---

## Tips

1. **Photos**: Always set `type: 'photo'` - this is what was missing before!
2. **Images**: Use high-quality images (at least 1200x800px recommended)
3. **Links**: Set `link: null` if you don't want the photo card to be clickable
4. **Videos**: YouTube thumbnails are auto-generated, no need to provide thumbnail
5. **Articles**: If you provide title/description, it won't fetch from the URL (faster)
6. **Order**: Cards appear in the order you add them to the array

---

## Full Example with Multiple Cards

```javascript
const MEDIA_CARDS = [
  
  // Photo card
  {
    type:        'photo',
    thumbnail:   'https://i.imgur.com/photo1.jpg',
    link:        null,
    category:    'clients',
    label:       'Client Story',
    title:       'Success Story: ABC Corp',
    description: 'How we helped ABC Corp transform their HR operations.',
    source:      'ABC Corp',
    date:        'May 2026',
  },
  
  // Video card
  {
    url:         'https://www.youtube.com/watch?v=abc123',
    category:    'demos',
    label:       'Product Demo',
    title:       'navik Platform Overview',
    description: 'Complete walkthrough of our platform.',
    source:      'navik',
    date:        '1 week ago',
    duration:    '8:30',
  },
  
  // Article card
  {
    url:         'https://blog.example.com/navik-case-study',
    category:    'clients',
    label:       'Case Study',
    title:       'Digital Transformation at XYZ Inc',
    description: 'Read how XYZ Inc achieved 40% efficiency gains.',
    source:      'XYZ Inc',
    date:        'April 2026',
  },

];
```

---

## Need Help?

- Check the console (F12) for any errors
- Make sure image URLs are publicly accessible
- Test your changes by refreshing the page
- Cards appear in the "Customer Stories" section on the homepage
