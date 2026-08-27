/* ═══════════════════════════════════════════
   TOOLS HUB — Navigation Logic
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Update active nav item based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'tools-hub.html';
  
  const navItems = document.querySelectorAll('.tool-nav-item');
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    const fileName = href.split('/').pop();
    
    if (fileName === currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});
