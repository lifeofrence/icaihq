/**
 * ICAI - Industrial & Commercialization Awareness Initiatives
 * Main Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Header Injection
    const headerHTML = `
        <div class="nav-container">
            <div class="logo">
                <a href="index.html" style="display: flex; align-items: center; gap: 10px;">
                    <img src="assets/img/ICAIlogo.png" alt="ICAI Logo" class="brand-logo">
                    <img src="assets/img/host/coatofarm.jpeg" alt="Nigeria Coat of Arms" class="brand-logo">
                </a>
            </div>
            <div class="nav-links">
                <a href="index.html">Home</a>
                <div class="dropdown">
                    <a href="#" class="dropdown-toggle">About Us <i data-lucide="chevron-down"></i></a>
                    <div class="dropdown-menu">
                        <a href="about.html">About ICAI</a>
                        <a href="our-profile.html">Organization Profile</a>
                        <a href="our-team.html">Our Team</a>
                        <a href="hosts.html">Our Hosts</a>
                        <a href="our-partners.html">Strategic Partners</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="dropdown-toggle">Program <i data-lucide="chevron-down"></i></a>
                    <div class="dropdown-menu">
                        <a href="program-info.html">Program Info</a>
                        <a href="summit-agenda.html">Summit Agenda</a>
                        <a href="business-plan.html">Project Overview</a>
                        <a href="gallery.html">Event Gallery</a>
                    </div>
                </div>
                <a href="packages.html">Packages</a>
                <a href="contact.html">Contact</a>
            </div>
            <div class="nav-cta">
                <a href="register.html" class="btn btn-accent">Register Now</a>
            </div>
            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                <i data-lucide="menu"></i>
            </button>
        </div>
    `;

    const mainNav = document.getElementById('main-nav');
    if (mainNav) {
        mainNav.innerHTML = headerHTML;
        
        // Highlight active link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const allLinks = mainNav.querySelectorAll('a');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // 0.1 Footer Injection
    const footerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <img src="assets/img/ICAIlogo.png" alt="ICAI Logo" class="footer-logo">
                    <p>Empowering industries through awareness, commercialization, and global partnerships.</p>
                </div>
                <div class="footer-links">
                    <h4>Program</h4>
                    <a href="summit-agenda.html">Agenda</a>
                    <a href="packages.html">Packages</a>
                    <a href="program-info.html">Program Info</a>
                    <a href="business-plan.html">Project Overview</a>
                    <a href="gallery.html">Gallery</a>
                </div>
                <div class="footer-links">
                    <h4>Organization</h4>
                    <a href="about.html">About Us</a>
                    <a href="our-profile.html">Our Profile</a>
                    <a href="our-team.html">Our Team</a>
                    <a href="hosts.html">Our Hosts</a>
                    <a href="our-partners.html">Strategic Partners</a>
                </div>
                <div class="footer-contact">
                    <h4>Contact</h4>
                    <p><i data-lucide="mail"></i> info@icaihq.com</p>
                    <p><i data-lucide="phone"></i> +234 (0) 803 464 4036</p>
                    <p><i data-lucide="map-pin"></i> Abuja, Nigeria</p>
                    <div class="footer-social">
                        <h4>Follow Us</h4>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/company/120684176" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                            <a href="https://www.facebook.com/share/1FUkSzfzRx/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/icaihq/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                            <a href="https://www.youtube.com/channel/UCwr3deyaFttHTUicS3IuyvQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 <a href="https://icaihq.com" style="color:rgba(255,255,255,0.5);text-decoration:none;">www.icaihq.com</a> &nbsp;|&nbsp; Designed by <a href="https://kazpero.com.ng" target="_blank" rel="noopener noreferrer" style="color:rgba(255,255,255,0.5);text-decoration:none;">Kazpero Nig Ltd</a> (+2348034724902)</p>
            </div>
        </div>
    `;

    const mainFooter = document.querySelector('.main-footer');
    if (mainFooter) {
        mainFooter.innerHTML = footerHTML;
    }

    // 1. Initialize Lucide Icons (in case called from script)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Countdown Timer to October 16, 2026
    const targetDate = new Date('October 16, 2026 00:00:00').getTime();

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

    // 7. Clean URL: remove .html extension from address bar only
    if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.slice(0, -5);
        history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
    }
});
