// ═══════════════════════════════════════════
// BLOG MODAL HANDLER
// ═══════════════════════════════════════════

class BlogModal {
  constructor() {
    this.modal = document.getElementById('blogModalOverlay');
    this.closeButtons = document.querySelectorAll('#modalCloseBtn, #modalCloseBtn2');
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Close modal on button click
    this.closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.closeModal());
    });

    // Close modal on overlay click (outside content)
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Add click handlers to "Read More" links on blog cards (using event delegation)
    this.attachReadMoreListeners();
  }

  attachReadMoreListeners() {
    // Delegate to document for dynamic content
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.blog-post-link');
      if (link) {
        e.preventDefault();
        const card = link.closest('.blog-post-card');
        if (card) {
          this.openModal(card);
        }
      }
    });
  }

  openModal(cardElement) {
    // Extract data from card
    const title = cardElement.querySelector('.blog-post-title')?.textContent || 'Blog Post';
    const image = cardElement.querySelector('.blog-post-image')?.src || '';
    const category = cardElement.querySelector('.blog-post-category')?.textContent || 'General';
    const excerpt = cardElement.querySelector('.blog-post-excerpt')?.textContent || '';
    const author = cardElement.querySelector('.blog-post-author')?.textContent || 'navik Team';
    const date = cardElement.querySelector('.blog-post-date')?.textContent || new Date().toLocaleDateString();
    const readtime = cardElement.querySelector('.blog-post-readtime')?.textContent || '5 min read';
    
    // Get full content from data attribute
    let fullContent = cardElement.getAttribute('data-content') || excerpt;
    
    console.log('Blog Post Data:', { title, category, author });
    console.log('Raw content from data-content:', fullContent ? fullContent.substring(0, 100) + '...' : 'NO CONTENT');
    
    // Decode HTML entities if content is escaped
    if (fullContent) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = fullContent;
      fullContent = textarea.value;
      console.log('Decoded content:', fullContent ? fullContent.substring(0, 100) + '...' : 'NO CONTENT');
    }

    // Populate modal with data
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalImage').alt = title;
    document.getElementById('modalCategory').textContent = category;
    document.getElementById('modalAuthor').textContent = author;
    document.getElementById('modalDate').textContent = date;
    document.getElementById('modalReadtime').textContent = readtime;

    // Set the full content (now properly decoded)
    const modalTextEl = document.getElementById('modalText');
    modalTextEl.innerHTML = fullContent;
    console.log('Modal text innerHTML set, length:', fullContent.length);

    // Show modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    // Scroll to top of modal
    const modalContent = document.getElementById('blogModalContent');
    if (modalContent) {
      modalContent.scrollTop = 0;
    }
  }

  generateBlogContent(title, excerpt) {
    // Return the actual content from the blog post data
    // This will be overridden by the actual content from blog cards
    return excerpt || `<p>Read the full article to learn more about ${title}.</p>`;
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable background scroll
  }
}

// Initialize modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BlogModal();
});
