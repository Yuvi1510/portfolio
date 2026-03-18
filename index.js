// script.js – handles mobile toggle, download CV simulation, and active nav highlight

document.addEventListener('DOMContentLoaded', function() {
  // ----- mobile navigation toggle -----
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('show');
      // change icon (optional)
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // close mobile menu if a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // ----- simulate CV download (all buttons & links) -----
  function simulateDownload() {
    // Create a dummy text file to simulate CV download (since we can't provide a real PDF)
    const blob = new Blob(
      ["This is a placeholder for Elias Mendoza's CV.\n\n---\nExperience: Senior creative developer\nSkills: UI/UX, React, Python, Three.js\nContact: hello@elias.design\n\n(Replace this with your actual CV.pdf)"],
      { type: 'application/pdf' } // mimic pdf
    );
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Yuvraj_Pun_CV.pdf'; // filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Optional small feedback (can be improved)
    alert('📄 CV download started (simulated PDF). Replace with your real file.');
  }

  // select ALL elements that should trigger download
  const downloadTriggers = [
    'downloadCvBtn',
    'downloadCvBtn2',
    'contactCvBtn',
    'downloadFooter'
  ];

  downloadTriggers.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();   // avoid any link jump
        simulateDownload();
      });
    }
  });

  // (optional) highlight active nav link while scrolling
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let scrollY = window.scrollY + 100; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // add small active style (optional)
  const style = document.createElement('style');
  style.innerHTML = `.nav-link.active { color: #2563eb; } .nav-link.active::after { width: 100%; }`;
  document.head.appendChild(style);

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // call once

  // footer year (just a nice touch)
  const footer = document.querySelector('.footer p');
  if (footer) {
    const year = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace('2026', year);
  }
});