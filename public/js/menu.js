//adds mobile hamburger menu and brings in some animations
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
  
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      
      
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.maxHeight = '0px';
      } else {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      }
    });
  });