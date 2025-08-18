/**
 * Main JavaScript file for the portfolio website
 * Handles topbar functionality and initializes the language selector
 */

document.addEventListener('DOMContentLoaded', function() {
  // Topbar functionality
  const topbar = document.getElementById('topbar');
  const nav = document.querySelector('#topbar nav');
  const logo = document.querySelector('#topbar .logo');
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

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
  
  // Theme Toggle Functionality - Improved
  if (themeToggle) {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-theme');
      updateThemeIcon(true);
    }
    
    // Add transition class to body
    document.body.classList.add('theme-transition');
    
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add animation class
      document.body.classList.add('theme-changing');
      
      // Toggle theme with slight delay for smoother transition
      setTimeout(() => {
        document.body.classList.toggle('dark-theme');
        
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        
        updateThemeIcon(isDarkTheme);
        
        // Remove animation class after transition
        setTimeout(() => {
          document.body.classList.remove('theme-changing');
        }, 300);
      }, 50);
    });
  }
  
  function updateThemeIcon(isDark) {
    const iconElement = themeToggle.querySelector('i');
    if (iconElement) {
      if (isDark) {
        iconElement.className = 'fas fa-sun';
      } else {
        iconElement.className = 'fas fa-moon';
      }
    }
  }
  
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
  
  // Email copy functionality
  const contactEmailBtn = document.getElementById('contact-email-btn');
  
  if (contactEmailBtn) {
    contactEmailBtn.addEventListener('click', function(e) {
      e.preventDefault();
  // Prefer data-email or the visible contact email in the DOM
  const emailFromData = contactEmailBtn.dataset.email;
  const emailFromDom = document.getElementById('contact-email')?.textContent?.trim();
  const emailToCopy = emailFromData || emailFromDom || 'contato.robertfabio@gmail.com';
  copyEmailToClipboard(emailToCopy);
    });
  }
  
  function copyEmailToClipboard(email) {
    // Use navigator.clipboard API if available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email)
        .then(() => showEmailNotification())
        .catch(err => {
          console.error('Erro ao copiar: ', err);
          // Fallback method if clipboard API fails
          fallbackCopyEmail(email);
        });
    } else {
      // Fallback for browsers without clipboard API
      fallbackCopyEmail(email);
    }
  }
  
  function fallbackCopyEmail(email) {
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    
    try {
      document.execCommand('copy');
      showEmailNotification();
    } catch (err) {
      console.error('Fallback: Erro ao copiar email', err);
      alert('Não foi possível copiar o email. Por favor, copie manualmente: ' + email);
    }
    
    document.body.removeChild(tempInput);
  }
  
  function showEmailNotification() {
    // Remove existing notification if there is one
    const existingNotification = document.querySelector('.email-notification');
    if (existingNotification) {
      document.body.removeChild(existingNotification);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'email-notification';
    
    // Use translations
    let text = 'Email copiado!';
    try {
      const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'pt';
      if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang]['email-copied']) {
        text = translations[currentLang]['email-copied'];
      }
    } catch (e) {
      // keep default
    }
    notification.textContent = text;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after animation completes
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 2000);
  }

  // Initialize language selector functionality
  initializeLanguageSelector();

  // Menu Toggle Functionality - Improved for mobile
  if (menuToggle && mainNav) {
    let isMenuOpen = false;

    function toggleMenu(open) {
      isMenuOpen = open;
      menuToggle.classList.toggle('active', open);
  mainNav.classList.toggle('active', open);
  mainNav.classList.toggle('show', open);
      document.body.style.overflow = open ? 'hidden' : '';
      
      // Adiciona classe ao body para prevenir scroll
      document.body.classList.toggle('menu-open', open);
      
      // Adiciona uma transição suave para o botão do menu
      menuToggle.style.transition = 'all 0.3s ease';
    }

    menuToggle.addEventListener('click', function(event) {
      event.stopPropagation(); // Previne que o evento se propague
      toggleMenu(!isMenuOpen);
    });

    // Fecha o menu quando clicar em qualquer lugar fora dele
    document.addEventListener('click', function(event) {
      if (isMenuOpen && !menuToggle.contains(event.target) && !mainNav.contains(event.target)) {
        toggleMenu(false);
      }
    });

    // Fecha o menu quando clicar em um link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          toggleMenu(false);
          
          if (targetElement) {
            setTimeout(() => {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              // Atualiza a URL sem recarregar a página
              history.pushState(null, '', targetId);
            }, 300);
          }
        } else {
          toggleMenu(false);
        }
      });
    });

    // Fecha o menu quando pressionar ESC
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && isMenuOpen) {
        toggleMenu(false);
      }
    });

    // Previne que o menu feche quando clicar dentro dele
    mainNav.addEventListener('click', function(event) {
      event.stopPropagation();
    });
    
    // Ajusta o menu quando a orientação do dispositivo muda
    window.addEventListener('resize', function() {
      if (window.innerWidth > 480 && isMenuOpen) {
        toggleMenu(false);
      }
    });
    
    // Adiciona efeito de toque para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(event) {
      touchStartX = event.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(event) {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 75 && !isMenuOpen) {
        // Swipe da direita para a esquerda - abre o menu
        toggleMenu(true);
      }
      
      if (touchEndX > touchStartX + 75 && isMenuOpen) {
        // Swipe da esquerda para a direita - fecha o menu
        toggleMenu(false);
      }
    }
  }
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
  
  // Create language text
  const langText = document.createElement('span');
  
  // Add elements to button
  langToggle.appendChild(langText);
  
  // Add click event to toggle language
  langToggle.addEventListener('click', toggleLanguage);
  
  // Add button to navigation
  nav.appendChild(langToggle);
}

// Mobile menu toggle
(function(){
  const btn = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if(btn && nav){
    btn.addEventListener('click', () => {
      nav.classList.toggle('show');
      btn.setAttribute('aria-expanded', nav.classList.contains('show') ? 'true' : 'false');
    });
    // Close nav on link click (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('show')));
  }
})();

// Copiar email com feedback simples
(function(){
  const copyBtn = document.getElementById('contact-email-btn');
  if(copyBtn){
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = copyBtn.dataset.email || document.getElementById('contact-email')?.textContent;
      if(!email) return;
      navigator.clipboard?.writeText(email).then(() => {
        // pequeno feedback visual
        const originalTitle = copyBtn.title;
        copyBtn.title = 'Email copiado!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.title = originalTitle;
          copyBtn.classList.remove('copied');
        }, 1800);
      }).catch(() => {
        alert('Não foi possível copiar o e‑mail automaticamente. Selecione e copie manualmente.');
      });
    });
  }
})();
