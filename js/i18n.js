/**
 * Internacionalização (i18n) - Sistema de tradução para o site
 * Este arquivo contém as traduções e funções para alternar entre português e inglês
 */

// Objeto com as traduções em português e inglês
const translations = {
  'pt-BR': {
    // Topbar
    'nav-experience': 'Experiência',
    'nav-education': 'Educação',
    'nav-projects': 'Projetos',
    'nav-contact': 'Contato',
    'nav-schedules': 'Agenda',
    
    // Banner
    'banner-welcome': 'Bem-vindo ao Meu Portfólio',
    'banner-developer': 'Desenvolvedor',
    'banner-student': 'Estudante',
    'banner-location': 'Localização',
    
    // Experience
    'experience-title': 'Experiências Profissionais',
    'experience-subtitle': 'Minha jornada até agora',
    'experience-graphic-designer': 'Designer Gráfico',
    'experience-local-print': 'Gráfica Local',
    'experience-months': 'meses',
    'experience-coordinator': 'Coordenador Geral & Secretário',
    'experience-admin-center': 'Centro Acadêmico de Administração (UFERSA)',
    'experience-graphic-design': 'Design Gráfico',
    'experience-designed-marketing': 'Criação de materiais de marketing (flyers, banners, logos) usando Canva e CorelDRAW',
    'experience-collaborated-clients': 'Colaboração com clientes para refinar conceitos visuais',
    'experience-managed-workflow': 'Gerenciamento de fluxo de trabalho para múltiplos projetos, cumprindo prazos apertados',
    'experience-volunteer': 'Trabalho Voluntário',
    'experience-organized-events': 'Organização de eventos acadêmicos, melhorando o engajamento dos estudantes',
    'experience-streamlined-processes': 'Otimização de processos de documentação',
    'experience-coordinated-activities': 'Coordenação de atividades administrativas',
    
    // Education
    'education-title': 'Educação',
    'education-subtitle': 'Formação Acadêmica',
    'education-bsc-cs': 'Bacharelado em Ciência da Computação',
    'education-bsc-business': 'Bacharelado em Administração',
    'education-ufersa': 'Universidade Federal Rural do Semi-Árido (UFERSA)',
    'education-semester': 'semestre',
    'education-semesters': 'semestres',
    'education-completed': 'concluídos',
    
    // Projects
    'projects-title': 'Projetos em Destaque',
    'projects-subtitle': 'Trabalhos e experiências profissionais',
    'projects-web-dev': 'Desenvolvimento Web',
    'projects-dev-highlight': 'Projetos de desenvolvimento em destaque',
    'projects-cacc': 'Site do Centro Acadêmico de Ciência da Computação - Desenvolvido com React, Node.js, Next.js e Tailwind CSS',
    'projects-portfolio': 'Um presente em forma de buquê 3D virtual, desenvolvido em JavaScript puro',
    'projects-skills': 'Competências',
    'projects-expertise': 'Expertise técnica e profissional',
    'projects-graphic-design': 'Design Gráfico',
    'projects-design-tools': 'Canva, CorelDRAW, Design Visual, Materiais de Marketing',
    'projects-academic': 'Formação Acadêmica',
    'projects-academic-info': 'Ciência da Computação e Administração (UFERSA)',
    'projects-languages': 'Idiomas',
    'projects-languages-info': 'Português (Nativo), Inglês (Avançado)',
    'projects-interpersonal': 'Habilidades Interpessoais',
    'projects-interpersonal-info': 'Gestão de Projetos, Comunicação com Clientes, Coordenação de Equipes',
    'projects-mockup': 'Mockup',
    
    // Contact
    'contact-title': 'Contato',
    'contact-subtitle': 'Conecte-se comigo nas redes sociais',
    'contact-download': 'Download CV',
    
    // Footer
    'footer-designed': 'Desenvolvido com paixão por Fábio Gurgel',
  },
  'en-US': {
    // Topbar
    'nav-experience': 'Experience',
    'nav-education': 'Education',
    'nav-projects': 'Projects',
    'nav-contact': 'Contact',
    'nav-schedules': 'Schedules',
    
    // Banner
    'banner-welcome': 'Welcome to My Portfolio',
    'banner-developer': 'Developer',
    'banner-student': 'Student',
    'banner-location': 'Location',
    
    // Experience
    'experience-title': 'Professional Experiences',
    'experience-subtitle': 'My journey so far',
    'experience-graphic-designer': 'Graphic Designer',
    'experience-local-print': 'Local Print Shop',
    'experience-months': 'months',
    'experience-coordinator': 'General Coordinator & Secretary',
    'experience-admin-center': 'Administration Academic Center (UFERSA)',
    'experience-graphic-design': 'Graphic Design',
    'experience-designed-marketing': 'Designed marketing materials (flyers, banners, logos) using Canva and CorelDRAW',
    'experience-collaborated-clients': 'Collaborated with clients to refine visual concepts',
    'experience-managed-workflow': 'Managed workflow for multiple projects, meeting tight deadlines',
    'experience-volunteer': 'Volunteer Work',
    'experience-organized-events': 'Organized academic events, improving student engagement',
    'experience-streamlined-processes': 'Streamlined documentation processes',
    'experience-coordinated-activities': 'Coordinated administrative activities',
    
    // Education
    'education-title': 'Education',
    'education-subtitle': 'Academic Background',
    'education-bsc-cs': 'B.Sc. in Computer Science',
    'education-bsc-business': 'B.Sc. in Business Administration',
    'education-ufersa': 'Federal University of the Semi-Arid (UFERSA)',
    'education-semester': 'semester',
    'education-semesters': 'semesters',
    'education-completed': 'completed',
    
    // Projects
    'projects-title': 'Featured Projects',
    'projects-subtitle': 'Works and professional experiences',
    'projects-web-dev': 'Web Development',
    'projects-dev-highlight': 'Featured development projects',
    'projects-cacc': 'Computer Science Academic Center Website - Developed with React, Node.js, Next.js and Tailwind CSS',
    'projects-portfolio': 'A virtual 3D bouquet gift, developed in pure JavaScript',
    'projects-skills': 'Skills',
    'projects-expertise': 'Technical and professional expertise',
    'projects-graphic-design': 'Graphic Design',
    'projects-design-tools': 'Canva, CorelDRAW, Visual Design, Marketing Materials',
    'projects-academic': 'Academic Background',
    'projects-academic-info': 'Computer Science and Business Administration (UFERSA)',
    'projects-languages': 'Languages',
    'projects-languages-info': 'Portuguese (Native), English (Advanced)',
    'projects-interpersonal': 'Interpersonal Skills',
    'projects-interpersonal-info': 'Project Management, Client Communication, Team Coordination',
    'projects-mockup': 'Mockup',
    
    // Contact
    'contact-title': 'Contact',
    'contact-subtitle': 'Connect with me on social media',
    'contact-download': 'Download CV',
    
    // Footer
    'footer-designed': 'Designed with passion by Fábio Gurgel',
  }
};

// Função para obter o idioma atual do localStorage ou definir o padrão
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'pt-BR';
}

// Função para alternar entre os idiomas
function toggleLanguage() {
  const currentLang = getCurrentLanguage();
  const newLang = currentLang === 'pt-BR' ? 'en-US' : 'pt-BR';
  localStorage.setItem('language', newLang);
  
  // Add transition class to body for smooth page transition
  document.body.classList.add('language-transition');
  
  // Update interface after a small delay for better visual effect
  setTimeout(() => {
    applyTranslations();
    updateLanguageButton();
    document.body.classList.remove('language-transition');
  }, 150);
  
  // Add animation to language selector
  const langButton = document.getElementById('language-toggle');
  if (langButton) {
    langButton.classList.add('language-changed');
    setTimeout(() => {
      langButton.classList.remove('language-changed');
    }, 600);
  }
}

// Função para aplicar as traduções na página
function applyTranslations() {
  const currentLang = getCurrentLanguage();
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      element.innerHTML = translations[currentLang][key];
    }
  });
}

// Função para atualizar o botão de idioma
function updateLanguageButton() {
  const langButton = document.getElementById('language-toggle');
  const currentLang = getCurrentLanguage();
  
  if (langButton) {
    // Update the globe icon for different languages
    let globeIcon = langButton.querySelector('i');
    if (globeIcon) {
      // Use standard globe icon that's available in Font Awesome 5.3.1
      globeIcon.className = 'fas fa-globe fa-lg';
    }
    
    // Update the text of the language
    const langText = langButton.querySelector('span');
    if (langText) {
      langText.textContent = currentLang === 'pt-BR' ? 'PT' : 'EN';
      
      // Update tooltip based on current language
      langButton.setAttribute('title', currentLang === 'pt-BR' 
        ? 'PT → English' 
        : 'EN → Português');
    }
    
    // Update the button appearance for current language
    langButton.setAttribute('data-lang', currentLang === 'pt-BR' ? 'pt' : 'en');
  }
}

// Inicializar a tradução quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLanguageButton();
});