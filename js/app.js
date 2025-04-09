/**
 * Main JavaScript file for the portfolio website
 * Handles topbar functionality and initializes the language selector
 */

document.addEventListener('DOMContentLoaded', function() {
  // Topbar functionality
  const topbar = document.getElementById('topbar');
  const toggler = document.getElementById('topbar-toggler');
  const nav = document.querySelector('#topbar nav');
  const logo = document.querySelector('#topbar .logo');

  // Add shine effect to logo
  if (logo) {
    logo.classList.add('shine-effect');
  }

  // Add shadow to topbar on scroll with smooth transition
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      topbar.classList.add('shadow');
    } else {
      topbar.classList.remove('shadow');
    }
  });
  
  // Add scroll reveal animation to sections
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        section.classList.add('fade-in-up-bounce');
        observer.unobserve(section);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Toggle navigation menu with smooth animation
  if (toggler) {
    toggler.addEventListener('click', function() {
      nav.classList.toggle('show');
      toggler.classList.toggle('active');
      
      // Add rotation animation to toggler icon
      const togglerIcon = toggler.querySelector('i');
      if (togglerIcon) {
        togglerIcon.style.transition = 'transform 0.3s ease';
        togglerIcon.style.transform = nav.classList.contains('show') ? 'rotate(90deg)' : 'rotate(0deg)';
      }
    });
  }

  // Experience section tabs
  const experiences = document.querySelectorAll('.experience');
  const descriptions = document.querySelectorAll('.exp-description');

  experiences.forEach(exp => {
    exp.addEventListener('click', function() {
      // Remove active class from all experiences
      experiences.forEach(e => e.classList.remove('active'));
      // Add active class to clicked experience
      this.classList.add('active');

      // Hide all descriptions
      descriptions.forEach(desc => desc.classList.remove('active'));
      // Show description for clicked experience
      const target = this.getAttribute('data-target');
      document.querySelector(target).classList.add('active');
    });
  });

  // Initialize language selector functionality
  initializeLanguageSelector();
});

/**
 * Initialize the language selector functionality
 */
function initializeLanguageSelector() {
  // Apply translations based on saved language preference
  applyTranslations();
  
  // Create language selector if it doesn't exist
  if (!document.getElementById('language-toggle')) {
    createLanguageSelector();
  } else {
    // Add click event to existing language toggle
    const existingLangToggle = document.getElementById('language-toggle');
    existingLangToggle.addEventListener('click', toggleLanguage);
  }
  
  // Update language button to show current language
  updateLanguageButton();
}

/**
 * Create the language selector button and add it to the navigation
 */
function createLanguageSelector() {
  const nav = document.querySelector('#topbar nav');
  if (!nav) return;
  
  // Create language toggle button
  const langToggle = document.createElement('div');
  langToggle.id = 'language-toggle';
  langToggle.className = 'language-selector';
  langToggle.setAttribute('title', 'Mudar idioma / Change language');
  
  // Create globe icon
  const globeIcon = document.createElement('i');
  globeIcon.className = 'fas fa-globe';
  
  // Create language text
  const langText = document.createElement('span');
  
  // Add elements to button
  langToggle.appendChild(globeIcon);
  langToggle.appendChild(langText);
  
  // Add click event to toggle language
  langToggle.addEventListener('click', toggleLanguage);
  
  // Add button to navigation
  nav.appendChild(langToggle);
}