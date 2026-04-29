document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Copy email logic
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'yuvrajpun544@gmail.com'; 
      const originalText = copyEmailBtn.innerText;

      // Modern async clipboard API (Requires HTTPS or localhost)
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
          copyEmailBtn.innerText = 'Email Copied!';
          setTimeout(() => { copyEmailBtn.innerText = originalText; }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      } else {
        // Fallback for file:/// protocol (local testing) or HTTP
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          copyEmailBtn.innerText = 'Email Copied!';
          setTimeout(() => { copyEmailBtn.innerText = originalText; }, 2000);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
      }
    });
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const navMenu = document.getElementById('navMenu');
  
  if (menuBtn && navMenu && closeBtn) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.add('active');
    });
    
    closeBtn.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
});
