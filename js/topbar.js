// Menu Toggle Functionality - Enhanced for all devices with improved accessibility
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const mediaQuery = window.matchMedia('(min-width: 481px)');
    
    if (menuToggle && mainNav) {
        let isMenuOpen = false;
        let overlay = null;
        let startX = 0;
        let currentX = 0;
        let touching = false;
        let touchStartTime = 0;
        const SWIPE_THRESHOLD = 50;
        const TAP_THRESHOLD = 200; // ms

        // Enhanced overlay management with better performance
        function createOverlay() {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'menu-overlay';
                overlay.setAttribute('aria-hidden', 'true');
                overlay.setAttribute('role', 'presentation');
                
                // Use passive event listener for better scroll performance
                overlay.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                }, { passive: false });
                
                overlay.addEventListener('click', (e) => {
                    e.preventDefault();
                    toggleMenu(false);
                });
                
                document.body.appendChild(overlay);
                // Force reflow before adding active class for smooth animation
                overlay.offsetHeight;
                overlay.classList.add('active');
            }
        }

        // Improved overlay removal with cleanup
        function removeOverlay() {
            if (overlay && overlay.parentNode) {
                overlay.classList.remove('active');
                overlay.addEventListener('transitionend', function handler() {
                    if (overlay && overlay.parentNode) {
                        overlay.removeEventListener('transitionend', handler);
                        overlay.parentNode.removeChild(overlay);
                        overlay = null;
                    }
                }, { once: true });
            }
        }

        function toggleMenu(open) {
            if (open === isMenuOpen || window.innerWidth > 480) return;

            isMenuOpen = open;
            
            // Update button state
            menuToggle.classList.toggle('active', open);
            menuToggle.setAttribute('aria-expanded', open.toString());
            menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');

            // Update navigation state
            mainNav.classList.toggle('active', open);
            mainNav.setAttribute('aria-hidden', (!open).toString());

            // Handle overlay and body scroll
            if (open) {
                createOverlay();
                document.body.classList.add('menu-open');
            } else {
                removeOverlay();
                document.body.classList.remove('menu-open');
            }

            // Focus management
            if (open) {
                // Focus first link after animation completes
                setTimeout(() => {
                    const firstLink = mainNav.querySelector('a');
                    if (firstLink) firstLink.focus();
                }, 300);
            } else {
                // Return focus to menu button
                menuToggle.focus();
            }
        }

        // Toggle menu on button click
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu(!isMenuOpen);
        });

        // Touch gesture handling
        // Enhanced touch handling with better gesture support
        function handleTouchStart(e) {
            const touch = e.touches[0];
            startX = touch.clientX;
            currentX = startX;
            touching = true;
            touchStartTime = Date.now();
            
            // Prevent scroll while touching menu
            if (isMenuOpen) {
                e.preventDefault();
            }
        }

        function handleTouchMove(e) {
            if (!touching) return;
            
            const touch = e.touches[0];
            currentX = touch.clientX;
            const diff = currentX - startX;
            
            // Allow sliding in both directions based on menu state
            const maxDiff = isMenuOpen ? -280 : 280;
            const minDiff = isMenuOpen ? 0 : 0;
            
            // Calculate position with bounds
            const position = Math.max(minDiff, Math.min(maxDiff, diff));
            
            // Apply transform with hardware acceleration
            requestAnimationFrame(() => {
                mainNav.style.transform = `translate3d(${position}px, 0, 0)`;
                
                if (overlay) {
                    const progress = Math.abs(position) / 280;
                    const opacity = isMenuOpen ? 1 - progress : progress;
                    overlay.style.opacity = opacity.toString();
                }
            });
        }

        function handleTouchEnd(e) {
            if (!touching) return;
            touching = false;
            
            const diff = currentX - startX;
            const duration = Date.now() - touchStartTime;
            
            // Reset styles with transition
            mainNav.style.transform = '';
            if (overlay) overlay.style.opacity = '';
            
            // Handle quick swipe or sufficient drag
            if (Math.abs(diff) > SWIPE_THRESHOLD || duration < TAP_THRESHOLD) {
                if ((isMenuOpen && diff < 0) || (!isMenuOpen && diff > 0)) {
                    toggleMenu(!isMenuOpen);
                }
            }
        }

        // Enhanced event listeners with better performance and accessibility
        mainNav.addEventListener('touchstart', handleTouchStart, { passive: false });
        mainNav.addEventListener('touchmove', handleTouchMove, { passive: false });
        mainNav.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Improved link handling with keyboard support
        mainNav.querySelectorAll('a').forEach((link, index) => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
            
            // Add keyboard navigation
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    toggleMenu(false);
                    menuToggle.focus();
                } else if (e.key === 'Tab') {
                    if (e.shiftKey && index === 0) {
                        e.preventDefault();
                        menuToggle.focus();
                    } else if (!e.shiftKey && index === mainNav.querySelectorAll('a').length - 1) {
                        e.preventDefault();
                        menuToggle.focus();
                    }
                }
            });
        });

        // Enhanced keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && isMenuOpen) {
                toggleMenu(false);
            }
        });

        // Improved resize handling with mediaQuery
        mediaQuery.addListener((e) => {
            if (e.matches && isMenuOpen) {
                toggleMenu(false);
            }
        });

        // Prevent scroll when menu is open on mobile
        document.body.addEventListener('touchmove', (e) => {
            if (isMenuOpen && !mediaQuery.matches) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    // Signal that topbar (menu) behavior was initialized by this script so other scripts can avoid duplicating handlers
    window.__topbarMenuInitialized = true;
});
