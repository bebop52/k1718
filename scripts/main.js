// Main JavaScript functionality with responsive features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Responsive progress bars animation
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    };

    // Enhanced Intersection Observer for responsive animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations based on screen size
                const delay = window.innerWidth < 768 ? index * 100 : index * 150;
                
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                    if (entry.target.classList.contains('progress-bar')) {
                        animateProgressBars();
                    }
                }, delay);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.skill-item, .project-card, .diary-entry, .contact-item, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // Responsive image loading
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    };

    lazyLoadImages();

    // Touch device detection and optimizations
    const isTouchDevice = () => {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    };

    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
        
        // Remove hover effects on touch devices
        const hoverElements = document.querySelectorAll('.project-card, .nav-link, .button');
        hoverElements.forEach(el => {
            el.classList.add('no-hover');
        });
    }

    // Responsive navigation enhancement
    const enhanceNavigation = () => {
        const navToggler = document.querySelector('.navbar-toggler');
        const navCollapse = document.querySelector('.navbar-collapse');
        
        if (navToggler && navCollapse) {
            navToggler.addEventListener('click', () => {
                const isExpanded = navToggler.getAttribute('aria-expanded') === 'true';
                navToggler.setAttribute('aria-expanded', !isExpanded);
            });
            
            // Close mobile menu when clicking on links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 992) {
                        const bsCollapse = new bootstrap.Collapse(navCollapse);
                        bsCollapse.hide();
                    }
                });
            });
        }
    };

    enhanceNavigation();

    // Window resize handler for responsive adjustments
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });

    console.log('Portfolio website initialized successfully!');
});

// Particle background effect with responsive adjustments
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // Adjust particle count based on screen size
    const particleCount = window.innerWidth < 768 ? 25 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(99, 102, 241, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        
        // Adjust animation speed for mobile
        const animationDuration = window.innerWidth < 768 ? 
            Math.random() * 8 + 8 : Math.random() * 10 + 10;
        
        particle.style.animation = `float ${animationDuration}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        heroSection.appendChild(particle);
    }
}