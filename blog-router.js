/* ═══════════════════════════════════════════════════════════
   navik — Blog Page Router
   Handles blog page loading via URL parameters
   Works like product-router.js but for blog content
   ═══════════════════════════════════════════════════════════ */

let currentBlog = null;
let isNavigatingBlog = false;

const BLOG_DATA = {
  allPosts: [
    {
      id: 1,
      title: 'How to Streamline HR Processes with Automation',
      excerpt: 'Discover how HR automation helps businesses simplify attendance, payroll, leave and workforce management while improving productivity and employee experience.',
      category: 'hr-automation',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      author: 'Navik Team',
      date: '2026-06-29',
      readTime: 10,
      slug: 'streamline-hr-processes-with-automation',
      content: '<h2>Introduction</h2><p>Managing HR operations manually can reduce productivity and increase errors in attendance, payroll and workforce management. HR automation helps organizations simplify repetitive tasks, improve efficiency and create a better employee experience.</p><h2>Key Points</h2><ul><li>Reduce manual HR workload</li><li>Automate attendance and leave management</li><li>Improve payroll accuracy</li><li>Enhance workforce visibility</li><li>Support faster HR decision-making</li></ul><h2>Deep Dive</h2><p>HR automation connects employee data, attendance, approvals and payroll into one centralized system. This helps HR teams reduce manual processes, improve accuracy and streamline daily operations.</p><h3>Why Integrated HRMS Matters</h3><p>An integrated platform like Navik HRMS enables businesses to manage HR, Workforce Management, Payroll, Contract Workforce Management and Demand Planning from a single system, improving operational control and workforce productivity.</p><h2>Implementation Tips</h2><ul><li>Identify repetitive HR tasks</li><li>Start with attendance and payroll automation</li><li>Train employees on digital workflows</li><li>Monitor reports and optimize processes regularly</li></ul><h2>Conclusion</h2><p>HR automation helps organizations save time, reduce errors and improve workforce efficiency. With Navik HRMS, businesses can streamline HR operations through a connected and scalable platform.</p>'
    },
    {
      id: 2,
      title: 'Why Workforce Management is Essential for Modern Businesses',
      excerpt: 'Explore how workforce management helps businesses improve productivity, optimize staffing, reduce operational inefficiencies and streamline attendance, payroll and workforce planning.',
      category: 'workforce-management',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
      author: 'Navik Team',
      date: '2026-06-29',
      readTime: 6,
      slug: 'why-workforce-management-is-essential',
      content: '<h2>Introduction</h2><p>Modern businesses operate in fast-paced environments where managing employees across departments, shifts and multiple locations can become complex. Manual workforce tracking often leads to attendance issues, overtime mismanagement, payroll errors and reduced productivity.</p><p>Workforce Management (WFM) helps organizations streamline employee operations through automation, real-time visibility and centralized workforce control. With solutions like Navik Workforce Management, businesses can improve operational efficiency while ensuring better workforce planning and utilization.</p><h2>Key Points</h2><ul><li>Automate attendance, shift and roster management</li><li>Reduce overtime and manual workforce errors</li><li>Improve employee productivity and accountability</li><li>Enable real-time workforce visibility</li><li>Support accurate payroll processing</li><li>Improve workforce planning and deployment</li></ul><h2>Deep Dive</h2><p>Workforce Management is more than attendance tracking. It helps organizations manage employee availability, shift scheduling, overtime, leave, deployment and workforce productivity from a single platform.</p><p>In industries such as manufacturing, logistics, healthcare and retail, workforce operations directly impact productivity and business performance. Manual workforce management processes often create delays, attendance discrepancies and payroll dependency issues.</p><p>An automated WFM system simplifies these challenges by integrating attendance, shifts, approvals and payroll inputs into one connected workflow. Managers gain better visibility into absenteeism, overtime trends and workforce availability, helping them make faster and more informed decisions.</p><h3>Why Integrated Workforce Management Matters</h3><p>Using separate systems for attendance, payroll and scheduling creates operational gaps and duplicate work. An integrated Workforce Management platform ensures smooth data flow across all workforce operations.</p><p>Navik Workforce Management connects HRMS, attendance, payroll, contract workforce management and demand planning into one centralized solution. This helps businesses improve workforce utilization, reduce administrative workload and increase operational control.</p><h2>Implementation Tips</h2><ul><li>Digitize attendance and shift scheduling processes</li><li>Automate overtime and approval workflows</li><li>Use mobile-enabled workforce access</li><li>Monitor workforce reports and productivity trends</li><li>Integrate workforce data with payroll systems</li></ul><h2>Conclusion</h2><p>Workforce Management plays a critical role in improving operational efficiency, workforce visibility and employee productivity. Businesses that automate workforce operations can reduce manual errors, optimize staffing and improve overall business performance.</p><p>With Navik Workforce Management, organizations can streamline attendance, payroll, workforce planning and employee operations through a scalable and integrated platform designed for modern workforce needs.</p>'
    },
    {
      id: 3,
      title: 'How Payroll Automation Improves Accuracy and Compliance',
      excerpt: 'Discover how payroll automation helps businesses reduce salary errors, improve compliance, streamline payroll processing and enhance workforce efficiency.',
      category: 'payroll-management',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
      author: 'Navik Team',
      date: '2026-06-29',
      readTime: 6,
      slug: 'payroll-automation-benefits',
      content: '<h2>Introduction</h2><p>Payroll is one of the most critical functions in any organization. Managing salaries manually can lead to calculation errors, delayed payments, compliance risks and increased administrative workload. As businesses grow, payroll complexity also increases with attendance tracking, overtime calculations, deductions and workforce policies.</p><p>Payroll automation helps organizations streamline salary processing, improve payroll accuracy and reduce dependency on manual calculations. With integrated solutions like Navik Payroll, businesses can automate payroll operations while improving efficiency and compliance management.</p><h2>Key Points</h2><ul><li>Reduce payroll calculation errors</li><li>Automate attendance-linked salary processing</li><li>Improve statutory compliance management</li><li>Reduce manual payroll workload</li><li>Enable faster payroll processing</li><li>Improve payroll transparency and reporting</li></ul><h2>Deep Dive</h2><p>Payroll automation connects attendance, leave, overtime and employee salary structures into one centralized system. This reduces manual intervention and ensures accurate payroll calculations every month.</p><p>In workforce-intensive industries, payroll processing often depends on multiple variables such as shifts, overtime, leave deductions and contractor payments. Manual handling of these processes can create inconsistencies and increase payroll processing time.</p><p>Automated payroll systems simplify these challenges by integrating workforce data directly with payroll workflows. HR and payroll teams can access real-time reports, reduce reconciliation efforts and improve salary accuracy.</p><h3>Why Integrated Payroll Systems Matter</h3><p>Using disconnected systems for attendance and payroll often creates data mismatches and operational inefficiencies. An integrated payroll platform ensures smooth data flow between attendance, leave, overtime and salary processing.</p><p>Navik Payroll integrates with HRMS, Workforce Management, Contract Workforce Management and Demand Planning to help organizations streamline payroll operations through one connected platform.</p><h2>Implementation Tips</h2><ul><li>Integrate attendance directly with payroll systems</li><li>Automate overtime and deduction calculations</li><li>Digitize employee salary records and approvals</li><li>Use payroll dashboards and automated reports</li><li>Review payroll processes regularly for optimization</li></ul><h2>Conclusion</h2><p>Payroll automation helps organizations improve salary accuracy, reduce administrative effort and strengthen compliance management. Businesses that automate payroll operations can process salaries faster while minimizing payroll-related errors.</p><p>With Navik Payroll, organizations can streamline payroll processing, attendance integration and workforce management through a scalable and integrated solution built for modern business operations.</p>'
    },
    {
      id: 4,
      title: 'The Importance of Contract Workforce Management in Modern Businesses',
      excerpt: 'Learn how contract workforce management helps businesses improve workforce visibility, compliance, attendance tracking and operational efficiency.',
      category: 'contract-workforce-management',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
      author: 'Navik Team',
      date: '2026-06-29',
      readTime: 6,
      slug: 'importance-of-contract-workforce-management',
      content: '<h2>Introduction</h2><p>Many organizations rely on contract workers to support daily operations, especially in industries like manufacturing, logistics, healthcare and facility management. However, managing contractors manually can create challenges related to attendance tracking, document management, compliance and workforce visibility.</p><p>Contract Workforce Management helps businesses streamline contractor operations through centralized workforce tracking, automated workflows and real-time visibility. With solutions like Navik Contract Workforce Management, organizations can improve operational control while reducing administrative workload.</p><h2>Key Points</h2><ul><li>Improve contractor and worker visibility</li><li>Automate attendance and workforce tracking</li><li>Manage contractor documents and compliance</li><li>Reduce manual workforce administration</li><li>Improve workforce deployment and productivity</li><li>Support better operational control</li></ul><h2>Deep Dive</h2><p>Contract Workforce Management helps organizations manage contractor onboarding, worker records, attendance, gate pass approvals and workforce deployment from a single platform.</p><p>In many businesses, contractor data is often maintained manually through spreadsheets and paper records, making it difficult to track workforce availability and compliance status. This can increase operational risks and reduce workforce visibility.</p><p>Automated contract workforce systems simplify these processes by digitizing contractor records, document verification and attendance tracking. Managers gain real-time visibility into contractor headcount, worker deployment and document validity across locations.</p><h3>Why Integrated Contractor Management Matters</h3><p>Managing contractors separately from HR and payroll systems creates operational gaps and duplicate work. An integrated platform helps businesses connect contract workforce operations with attendance, payroll and workforce planning.</p><p>Navik Contract Workforce Management integrates with HRMS, Workforce Management, Payroll and Demand Planning to provide organizations with centralized workforce control and improved operational efficiency.</p><h2>Implementation Tips</h2><ul><li>Digitize contractor onboarding and worker records</li><li>Automate attendance and gate pass approvals</li><li>Track document validity and compliance status</li><li>Use workforce dashboards for better visibility</li><li>Integrate contractor data with payroll and HR systems</li></ul><h2>Conclusion</h2><p>Contract Workforce Management helps organizations improve workforce visibility, streamline contractor operations and strengthen compliance management. Businesses that automate contractor workflows can reduce manual effort while improving workforce efficiency.</p><p>With Navik Contract Workforce Management, organizations can simplify contractor tracking, attendance management and workforce planning through a scalable and integrated workforce solution.</p>'
    },
    {
      id: 5,
      title: 'Benefits of Digital Attendance Management for Businesses',
      excerpt: 'Discover how digital attendance management helps organizations improve accuracy, reduce manual work and streamline workforce operations.',
      category: 'attendance-management',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
      author: 'Navik Team',
      date: '2026-06-29',
      readTime: 3,
      slug: 'digital-attendance-management-benefits',
      content: '<h2>Introduction</h2><p>Manual attendance tracking can lead to errors, payroll discrepancies and operational inefficiencies. Digital attendance management helps organizations automate attendance tracking and improve workforce visibility.</p><h2>Key Points</h2><ul><li>Automate attendance tracking</li><li>Reduce payroll errors</li><li>Improve shift and overtime visibility</li><li>Enable real-time workforce monitoring</li></ul><h2>Deep Dive</h2><p>Digital attendance systems integrate biometric devices, mobile attendance and workforce dashboards into one platform. This helps businesses reduce manual dependency and improve workforce accuracy.</p><h3>How Navik Helps</h3><p>Navik Attendance Management integrates with HRMS, Workforce Management and Payroll to streamline attendance and workforce operations.</p><h2>Implementation Tips</h2><ul><li>Integrate attendance with payroll</li><li>Automate shift and overtime tracking</li><li>Use mobile-enabled attendance systems</li></ul><h2>Conclusion</h2><p>Digital attendance management helps businesses improve workforce efficiency, reduce manual errors and streamline operations through automation.</p>'
    },
    {
      id: 6,
      title: 'How Demand Planning Improves Workforce Productivity',
      excerpt: 'Learn how workforce demand planning helps businesses optimize staffing, improve productivity and align workforce availability with operational demand.',
      category: 'demand-planning',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      author: 'Navik Team',
      date: '2026-06-29',
      readTime: 7,
      slug: 'workforce-demand-planning-productivity',
      content: '<h2>Introduction</h2><p>Workforce demand can change rapidly based on production targets, business growth, seasonal demand and operational requirements. Organizations that rely on manual workforce planning often struggle with understaffing, overtime dependency and productivity gaps.</p><p>Demand Planning helps businesses align workforce availability with operational demand through forecasting, workforce optimization and deployment planning. With solutions like Navik Demand Planning, organizations can improve workforce utilization and operational efficiency.</p><h2>Key Points</h2><ul><li>Improve workforce planning and allocation</li><li>Reduce understaffing and overtime dependency</li><li>Optimize workforce utilization</li><li>Improve operational productivity</li><li>Support skill-based workforce deployment</li><li>Enable data-driven workforce decisions</li></ul><h2>Deep Dive</h2><p>Demand Planning helps organizations forecast workforce requirements based on operational demand, production schedules and workforce availability. Instead of reacting to workforce shortages manually, businesses can proactively plan staffing requirements and deployment strategies.</p><p>In industries such as manufacturing, logistics, retail and healthcare, workforce demand can fluctuate frequently. Without proper workforce planning, organizations may face absenteeism challenges, increased overtime costs and operational inefficiencies.</p><p>Modern demand planning systems help organizations analyze workforce capacity, employee skills, shift availability and contractor requirements in real time. This enables businesses to optimize staffing and improve workforce productivity across departments and locations.</p><h3>Why Integrated Demand Planning Matters</h3><p>Workforce planning becomes more effective when connected with HR, attendance and payroll systems. An integrated demand planning solution helps organizations align workforce deployment with attendance, availability and business demand.</p><p>Navik Demand Planning integrates with HRMS, Workforce Management, Payroll and Contract Workforce Management to provide centralized workforce visibility and smarter workforce planning capabilities.</p><h2>Implementation Tips</h2><ul><li>Analyze workforce demand trends regularly</li><li>Use skill-based workforce planning</li><li>Integrate workforce demand with attendance data</li><li>Monitor overtime and staffing gaps</li><li>Use dashboards for workforce forecasting and reporting</li></ul><h2>Conclusion</h2><p>Demand Planning helps organizations improve workforce productivity, optimize staffing and reduce operational inefficiencies. Businesses that adopt workforce planning strategies can improve operational performance while reducing workforce-related challenges.</p><p>With Navik Demand Planning, organizations can streamline workforce forecasting, deployment and productivity management through a scalable and integrated workforce solution.</p>'
    },
    {
      id: 7,
      title: 'Top HR Tips to Improve Employee Productivity',
      excerpt: 'Explore practical HR tips that help businesses improve employee productivity, workforce engagement and operational efficiency.',
      category: 'hr-tips',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
      author: 'Navik Team',
      date: '2026-06-29',
      readTime: 5,
      slug: 'hr-tips-to-improve-employee-productivity',
      content: '<h2>Introduction</h2><p>Employee productivity plays a major role in business growth and operational success. HR teams are responsible for creating processes and workplace environments that help employees perform efficiently while staying engaged and motivated.</p><p>By adopting the right HR strategies and digital tools, organizations can improve workforce productivity, reduce operational inefficiencies and create a better employee experience.</p><h2>Key Points</h2><ul><li>Improve communication and employee engagement</li><li>Automate repetitive HR processes</li><li>Use workforce data for better decision-making</li><li>Encourage employee training and development</li><li>Track productivity and attendance effectively</li></ul><h2>Deep Dive</h2><p>HR productivity improvement starts with streamlined workforce operations. Manual HR tasks such as attendance tracking, leave approvals and payroll processing can consume significant time and reduce efficiency.</p><p>Automated HR systems help organizations simplify these processes while improving workforce visibility and operational control. Real-time dashboards, attendance tracking and performance monitoring help managers make faster workforce decisions.</p><p>Employee engagement also plays an important role in productivity. Organizations that invest in transparent communication, training programs and employee recognition often experience better workforce performance and retention.</p><h3>How Navik Helps HR Teams</h3><p>Navik HRMS helps organizations improve workforce productivity through integrated HRMS, Workforce Management, Payroll, Contract Workforce Management and Demand Planning solutions.</p><p>With centralized workforce data and automated workflows, HR teams can reduce administrative workload and focus more on employee engagement and strategic workforce planning.</p><h2>Implementation Tips</h2><ul><li>Automate attendance and payroll operations</li><li>Provide employees with self-service tools</li><li>Use workforce reports for performance tracking</li><li>Encourage regular employee feedback</li><li>Invest in workforce training and development</li></ul><h2>Conclusion</h2><p>Improving employee productivity requires a combination of effective HR strategies, workforce visibility and process automation. Businesses that invest in modern HR practices can improve operational efficiency and workforce engagement.</p><p>With Navik HRMS, organizations can streamline workforce operations and create a more productive and connected work environment.</p>'
    },
    {
      id: 8,
      title: 'Latest HR and Workforce Management Trends Shaping Businesses in 2026',
      excerpt: 'Explore the latest HR, payroll and workforce management trends transforming how modern businesses manage employees, productivity and workforce operations.',
      category: 'industry-updates',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a',
      author: 'Navik Team',
      date: '2026-06-29',
      readTime: 6,
      slug: 'latest-hr-workforce-management-trends-2026',
      content: '<h2>Introduction</h2><p>Businesses across industries are rapidly adopting digital workforce solutions to improve operational efficiency, employee experience and workforce visibility. In 2026, HR and workforce management are becoming more technology-driven, helping organizations streamline operations and make faster business decisions.</p><p>From payroll automation to workforce analytics and demand planning, modern HR technology is transforming how organizations manage employees and workforce operations.</p><h2>Key Trends in 2026</h2><ul><li>Increased adoption of HR and payroll automation</li><li>Growth in mobile workforce management solutions</li><li>Real-time attendance and productivity tracking</li><li>Greater focus on contract workforce visibility</li><li>Data-driven workforce planning and analytics</li><li>Integrated HRMS platforms replacing disconnected systems</li></ul><h2>Deep Dive</h2><p>Organizations are increasingly moving away from manual HR operations and fragmented systems. Businesses now require connected platforms that integrate HR, Workforce Management, Payroll and Demand Planning into a single ecosystem.</p><p>Workforce-intensive industries such as manufacturing, logistics, healthcare and retail are focusing on improving workforce productivity while reducing operational costs. Real-time dashboards, automated workflows and workforce analytics are helping HR and operations teams make better decisions.</p><p>Contract workforce management is also becoming a major priority as businesses seek better visibility into contractor attendance, compliance and workforce deployment.</p><h3>The Rise of Integrated Workforce Platforms</h3><p>Modern organizations are adopting integrated HRMS platforms to streamline workforce operations and improve data accuracy. Connected systems help businesses reduce manual effort, automate approvals and improve workforce planning.</p><p>Navik helps organizations simplify HR operations through integrated HRMS, Workforce Management, Payroll, Contract Workforce Management and Demand Planning solutions designed for modern business needs.</p><h2>Implementation Tips</h2><ul><li>Invest in integrated HR and workforce solutions</li><li>Automate attendance and payroll workflows</li><li>Use workforce analytics for decision-making</li><li>Enable mobile access for employees and managers</li><li>Monitor workforce productivity regularly</li></ul><h2>Conclusion</h2><p>HR and workforce management are evolving rapidly as businesses continue to adopt digital workforce solutions. Organizations that invest in automation and integrated workforce platforms can improve productivity, reduce operational inefficiencies and enhance employee experience.</p><p>With Navik, businesses can streamline HR, payroll, workforce management and demand planning through a scalable platform built for modern workforce operations.</p>'
    },
    {
      id: 9,
      title: 'Introducing Auto Punch In/Out System for Smarter Attendance Management',
      excerpt: 'Discover how Navik\'s Auto Punch In/Out system simplifies attendance tracking, reduces manual effort and improves workforce accuracy.',
      category: 'product-updates',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      author: 'Navik Team',
      date: '2026-06-29',
      readTime: 5,
      slug: 'auto-punch-in-out-system',
      content: '<h2>Introduction</h2><p>Managing employee attendance manually can often lead to missed punches, inaccurate records and payroll discrepancies. To simplify workforce attendance management, Navik introduces the Auto Punch In/Out System designed to improve attendance accuracy and reduce manual intervention.</p><p>The feature helps organizations automate employee punch records based on configured shift timings and workforce rules, ensuring smoother attendance processing across operations.</p><h2>Key Features</h2><ul><li>Automatic punch in/out based on shift schedules</li><li>Reduced missed punch incidents</li><li>Improved attendance accuracy</li><li>Seamless payroll integration</li><li>Configurable attendance rules</li><li>Better workforce visibility and reporting</li></ul><h2>Deep Dive</h2><p>In many organizations, employees forget to punch in or out, creating attendance mismatches and payroll processing delays. HR and managers often spend significant time correcting attendance records manually.</p><p>Navik\'s Auto Punch In/Out System addresses this challenge by automatically generating punch records based on predefined shift timings, attendance rules and workforce policies. This helps organizations reduce attendance discrepancies while improving operational efficiency.</p><p>The system is especially useful for businesses with multiple shifts, field employees, contract workforce and large operational teams where manual attendance tracking becomes difficult to manage.</p><h3>How the Auto Punch In/Out System Helps</h3><p>The feature enables organizations to streamline attendance workflows while improving payroll readiness and workforce transparency. Automated attendance processing reduces dependency on manual corrections and improves reporting accuracy.</p><p>Navik integrates Auto Punch In/Out with Workforce Management, Payroll and HRMS modules, helping businesses maintain connected workforce operations from attendance to salary processing.</p><h2>Implementation Tips</h2><ul><li>Define shift and attendance rules clearly</li><li>Configure auto punch timing policies carefully</li><li>Integrate attendance with payroll workflows</li><li>Monitor attendance reports regularly</li><li>Train managers on approval and exception workflows</li></ul><h2>Conclusion</h2><p>Navik\'s Auto Punch In/Out System helps organizations improve attendance accuracy, reduce manual effort and streamline workforce operations. By automating attendance management, businesses can reduce payroll discrepancies and improve workforce efficiency.</p><p>With integrated HRMS, Workforce Management and Payroll capabilities, Navik continues to deliver smart workforce solutions designed for modern business operations.</p>'
    }
  ]
};

function cleanupBlogPage() {
  // Remove existing blog page container
  const existingContainer = document.getElementById('blog-page-container');
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

function goBackHomeFromBlog() {
  if (isNavigatingBlog) return;
  isNavigatingBlog = true;
  
  // Clean up blog page
  cleanupBlogPage();
  currentBlog = null;
  
  // Change URL without triggering hashchange
  window.history.pushState(null, '', '#/');
  
  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  setTimeout(() => {
    isNavigatingBlog = false;
  }, 500);
}

function handleBlogRouter() {
  if (isNavigatingBlog) return;
  
  // Get blog status from hash
  const hash = window.location.hash;
  const isBlogPage = hash === '#/blog' || hash === '#/blog/';

  // If requesting blog page, navigate to blog.html
  if (isBlogPage) {
    // Navigate to blog.html
    window.location.href = 'blog.html';
    return;
  }

  // If not requesting blog page, exit
  if (!isBlogPage) return;
}

class BlogPageManager {
  constructor() {
    this.currentPage = 1;
    this.itemsPerPage = 6;
    this.allPosts = BLOG_DATA.allPosts;
    this.filteredPosts = [...this.allPosts];
    this.currentCategory = 'all';
    this.searchQuery = '';
  }

  init() {
    this.setupEventListeners();
    this.renderBlogPosts();
  }

  setupEventListeners() {
    // Category buttons
    const categoryButtons = document.querySelectorAll('.blog-cat-btn');
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.filterByCategory(e.target.dataset.category));
    });

    // Search
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterBySearch(e.target.value));
    }

    // Pagination
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    if (prevBtn) prevBtn.addEventListener('click', () => this.previousPage());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());

    // Newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSignup(e));
    }

    // Back buttons
    const backBtn = document.getElementById('blogBackBtn');
    const bottomBackBtn = document.getElementById('blogBottomBackBtn');
    if (backBtn) backBtn.addEventListener('click', goBackHomeFromBlog);
    if (bottomBackBtn) bottomBackBtn.addEventListener('click', goBackHomeFromBlog);
  }

  filterByCategory(category) {
    this.currentCategory = category;
    this.currentPage = 1;
    this.searchQuery = '';

    // Update active button
    document.querySelectorAll('.blog-cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });

    // Clear search input
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) searchInput.value = '';

    if (category === 'all') {
      this.filteredPosts = [...this.allPosts];
    } else {
      this.filteredPosts = this.allPosts.filter(post => post.category === category);
    }

    // Scroll to blog grid and render with animation
    const blogGrid = document.getElementById('blogPostsContainer');
    if (blogGrid) {
      blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.renderBlogPosts();
  }

  filterBySearch(query) {
    this.searchQuery = query.toLowerCase();
    this.currentPage = 1;

    if (!this.searchQuery) {
      this.filterByCategory(this.currentCategory);
      return;
    }

    this.filteredPosts = this.allPosts.filter(post =>
      post.title.toLowerCase().includes(this.searchQuery) ||
      post.excerpt.toLowerCase().includes(this.searchQuery) ||
      post.author.toLowerCase().includes(this.searchQuery)
    );

    // Reset category buttons
    document.querySelectorAll('.blog-cat-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Scroll to blog grid and render with animation
    const blogGrid = document.getElementById('blogPostsContainer');
    if (blogGrid) {
      blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.renderBlogPosts();
  }

  renderBlogPosts() {
    const container = document.getElementById('blogPostsContainer');
    if (!container) return;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

    if (postsToShow.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #94a3b8;">No articles found. Try a different search or category.</p>';
      this.updatePagination();
      return;
    }

    // Add fade out animation
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.3s ease-out';

    // Wait for fade out to complete, then update content
    setTimeout(() => {
      container.innerHTML = postsToShow.map(post => `
        <article class="blog-card" itemscope itemtype="https://schema.org/BlogPosting">
          <div style="position: relative; overflow: hidden; height: 200px;">
            <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;" itemprop="image">
            <span class="blog-category-badge">${this.getCategoryLabel(post.category)}</span>
          </div>
          
          <div class="blog-card-content">
            <h2 class="blog-card-title" itemprop="headline">
              ${post.title}
            </h2>
            
            <p class="blog-card-excerpt" itemprop="description">${post.excerpt}</p>
            
            <div class="blog-card-meta">
              <span itemprop="author">${post.author}</span>
              <span itemprop="datePublished">${this.formatDate(post.date)}</span>
              <span>${post.readTime} min read</span>
            </div>
            
            <a href="#" style="color: #2563eb; font-weight: 600; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.3s; margin-top: auto;" onmouseover="this.style.gap='10px'" onmouseout="this.style.gap='6px'">
              Read More →
            </a>

            <!-- Hidden SEO metadata -->
            <meta itemprop="articleBody" content="${post.content}">
            <meta itemprop="url" content="https://navik.in/blog/${post.slug}">
          </div>
        </article>
      `).join('');

      // Add fade in animation
      container.style.opacity = '1';
      
      // Add download button click handlers to blog cards
      container.querySelectorAll('.blog-card').forEach((card, index) => {
        const post = postsToShow[index];
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'blog-download-btn';
        downloadBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download PDF';
        downloadBtn.addEventListener('click', () => {
          const filename = `${post.slug}.pdf`;
          if (downloadGateManager) {
            downloadGateManager.requestDownload(post.slug, filename, 'pdf');
          }
        });
        
        const actionsArea = card.querySelector('a[href="#"]');
        if (actionsArea) {
          actionsArea.parentElement.insertBefore(downloadBtn, actionsArea.nextSibling);
        }
      });
      
      this.updatePagination();
    }, 300);
  }

  updatePagination() {
    const totalPages = Math.ceil(this.filteredPosts.length / this.itemsPerPage);
    
    const currentPageEl = document.getElementById('currentPage');
    const totalPagesEl = document.getElementById('totalPages');
    
    if (currentPageEl) currentPageEl.textContent = this.currentPage;
    if (totalPagesEl) totalPagesEl.textContent = totalPages;

    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) prevBtn.disabled = this.currentPage === 1;
    if (nextBtn) nextBtn.disabled = this.currentPage === totalPages;
  }

  nextPage() {
    const totalPages = Math.ceil(this.filteredPosts.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.renderBlogPosts();
      // Smooth scroll to top of blog grid
      const blogSection = document.querySelector('.blog-main-section');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderBlogPosts();
      // Smooth scroll to top of blog grid
      const blogSection = document.querySelector('.blog-main-section');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  handleNewsletterSignup(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing! You will receive updates about our latest HR insights and product news.');
    e.target.reset();
  }

  getCategoryLabel(category) {
    const labels = {
      'hr-tips': 'HR Tips',
      'hr-automation': 'HR Automation',
      'industry': 'Industry Updates',
      'industry-updates': 'Industry Updates',
      'product': 'Product Updates',
      'product-updates': 'Product Updates',
      'case-studies': 'Case Studies',
      'workforce-management': 'Workforce Management',
      'payroll-management': 'Payroll Management',
      'contract-workforce-management': 'Contract Workforce',
      'attendance-management': 'Attendance Management',
      'demand-planning': 'Demand Planning'
    };
    return labels[category] || category;
  }

  formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
}

let blogManager = null;

function initBlogPage() {
  blogManager = new BlogPageManager();
  blogManager.init();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  handleBlogRouter();
});

// Handle navigation via browser back/forward buttons
window.addEventListener('hashchange', () => {
  handleBlogRouter();
});

// Handle keyboard ESC key to go back
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && currentBlog !== null) {
    goBackHomeFromBlog();
  }
});

// Initial check on page load if DOM is already ready
if (document.readyState === 'complete') {
  handleBlogRouter();
}
