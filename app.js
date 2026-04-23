/**
 * ICAI - Industrial & Commercialization Awareness Initiatives
 * Main Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons (in case called from script)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Countdown Timer to June 29, 2026
    const targetDate = new Date('June 29, 2026 00:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 3. Animated Counters for Impact Section
    const counters = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps approx
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.innerText = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target.toLocaleString();
                    }
                };
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => counterObserver.observe(counter));

    // 4. Sticky Header Reveal on Scroll
    const header = document.querySelector('#main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // 5. Scroll Reveal Effect for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.hero-text-wrapper, .glass-card, .vip-pass, .stat-item, .section-title');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        revealObserver.observe(el);
    });

    // 6. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Create overlay backdrop dynamically
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('nav-overlay');
        document.body.appendChild(overlay);
    }

    const closeMenu = () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    };

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                navLinks.classList.add('active');
                mobileMenuBtn.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // prevent scroll
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'x');
                    lucide.createIcons();
                }
            }
        });

        // Close menu on overlay click
        overlay.addEventListener('click', closeMenu);

        // Close menu when clicking a nav link (but not dropdown toggles)
        navLinks.querySelectorAll('a').forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', closeMenu);
            }
        });

        // Toggle dropdowns on mobile click
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    const menu = toggle.nextElementSibling;
                    const isOpen = menu.style.display === 'block';
                    
                    // Close other submenus
                    document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
                    
                    menu.style.display = isOpen ? 'none' : 'block';
                }
            });
        });
    }
});
