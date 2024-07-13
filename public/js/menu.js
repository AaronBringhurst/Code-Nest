document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
  
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      
      // Add smooth height animation
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.maxHeight = '0px';
      } else {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      }
    });
  });