// Menu Toggle Functionality - Improved for mobile with slide animation
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (menuToggle && mainNav) {
        let isMenuOpen = false;
        let overlay = null;
        let startX = 0;
        let currentX = 0;
        let touching = false;

        // Create overlay element
        function createOverlay() {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'menu-overlay';
                overlay.setAttribute('aria-hidden', 'true');
                overlay.addEventListener('click', () => toggleMenu(false));
                document.body.appendChild(overlay);
                // Add active class after a small delay to trigger animation
                requestAnimationFrame(() => {
                    overlay.classList.add('active');
                });
            }
        }

        // Remove overlay element
        function removeOverlay() {
            if (overlay && overlay.parentNode) {
                overlay.classList.remove('active');
                setTimeout(() => {
                    if (overlay && overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                        overlay = null;
                    }
                }, 300);
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
        function handleTouchStart(e) {
            if (!isMenuOpen) return;
            const touch = e.touches[0];
            startX = touch.clientX;
            currentX = startX;
            touching = true;
        }

        function handleTouchMove(e) {
            if (!touching) return;
            
            const touch = e.touches[0];
            currentX = touch.clientX;
            const diff = currentX - startX;
            
            // Only allow sliding to close (sliding right)
            if (diff > 0) return;
            
            // Calculate position
            const position = Math.max(diff, -280);
            
            // Apply transform
            requestAnimationFrame(() => {
                mainNav.style.transform = `translateX(${position}px)`;
                
                // Adjust overlay opacity
                if (overlay) {
                    const opacity = Math.max(0, 1 + diff / 280);
                    overlay.style.opacity = opacity.toString();
                }
            });
        }

        function handleTouchEnd() {
            if (!touching) return;
            touching = false;
            
            const diff = currentX - startX;
            
            // Reset styles
            mainNav.style.transform = '';
            if (overlay) overlay.style.opacity = '';
            
            // If dragged more than 100px, close menu
            if (diff < -100) {
                toggleMenu(false);
            }
        }

        // Add touch event listeners
        mainNav.addEventListener('touchstart', handleTouchStart);
        mainNav.addEventListener('touchmove', handleTouchMove);
        mainNav.addEventListener('touchend', handleTouchEnd);
        
        // Close menu when clicking a link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // Close menu on ESC key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && isMenuOpen) {
                toggleMenu(false);
            }
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 480 && isMenuOpen) {
                    toggleMenu(false);
                }
            }, 100);
        });
    }
    // Signal that topbar (menu) behavior was initialized by this script so other scripts can avoid duplicating handlers
    window.__topbarMenuInitialized = true;
});
