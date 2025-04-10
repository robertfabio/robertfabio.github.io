/**
 * Main JavaScript file for the portfolio website
 * Handles topbar functionality and initializes the language selector
 */

document.addEventListener('DOMContentLoaded', function() {
  // Topbar functionality
  const topbar = document.getElementById('topbar');
  const nav = document.querySelector('#topbar nav');
  const logo = document.querySelector('#topbar .logo');
  const logoButton = document.getElementById('logo-button');
  const logoMenu = document.getElementById('logo-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const shareButton = document.getElementById('share-button');
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
  
  // Logo Button Click Functionality
  if (logoButton && logoMenu) {
    logoButton.addEventListener('click', function() {
      logoButton.classList.toggle('active');
      logoMenu.classList.toggle('active');
      
      // Add rotation animation
      logoButton.style.transition = 'all 0.3s ease';
      if (logoButton.classList.contains('active')) {
        logoButton.style.transform = 'scale(1.05)';
      } else {
        logoButton.style.transform = 'scale(1)';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!logoButton.contains(event.target) && !logoMenu.contains(event.target)) {
        logoButton.classList.remove('active');
        logoMenu.classList.remove('active');
        logoButton.style.transform = 'scale(1)';
      }
    });
  }
  
  // Compartilhar Funcionalidade
  if (shareButton) {
    shareButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Verificar se a API Web Share está disponível
      if (navigator.share) {
        navigator.share({
          title: 'Portfólio de Fábio Gurgel',
          text: 'Confira o portfólio de Fábio Gurgel!',
          url: window.location.href
        })
        .then(() => {
          console.log('Compartilhado com sucesso!');
        })
        .catch(err => {
          console.log('Erro ao compartilhar:', err);
          copyToClipboard(window.location.href);
        });
      } else {
        // Fallback para copiar para área de transferência
        copyToClipboard(window.location.href);
      }
      
      // Fechar menu
      logoButton.classList.remove('active');
      logoMenu.classList.remove('active');
      logoButton.style.transform = 'scale(1)';
    });
  }
  
  function copyToClipboard(text) {
    // Criar elemento temporário
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Mostrar mensagem de feedback
    const feedback = document.createElement('div');
    feedback.textContent = getCurrentLanguage() === 'pt-BR' ? 'Link copiado!' : 'Link copied!';
    feedback.style.position = 'fixed';
    feedback.style.bottom = '20px';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.padding = '10px 15px';
    feedback.style.backgroundColor = 'var(--accent)';
    feedback.style.color = 'white';
    feedback.style.borderRadius = '4px';
    feedback.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    feedback.style.zIndex = '9999';
    document.body.appendChild(feedback);
    
    // Remover após 2 segundos
    setTimeout(() => {
      feedback.style.opacity = '0';
      feedback.style.transition = 'opacity 0.5s ease';
      setTimeout(() => document.body.removeChild(feedback), 500);
    }, 2000);
  }
  
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
      
      // Close menu after selection
      logoButton.classList.remove('active');
      logoMenu.classList.remove('active');
      logoButton.style.transform = 'scale(1)';
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
      copyEmailToClipboard('fabio.filho25453@alunos.ufersa.edu.br');
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
    const currentLang = getCurrentLanguage();
    notification.textContent = translations[currentLang]['email-copied'];
    
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

  // Menu Toggle Functionality
  if (menuToggle && mainNav) {
    let isMenuOpen = false;

    function toggleMenu(open) {
      isMenuOpen = open;
      menuToggle.classList.toggle('active', open);
      mainNav.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
      
      // Adiciona classe ao body para prevenir scroll
      document.body.classList.toggle('menu-open', open);
    }

    menuToggle.addEventListener('click', function() {
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