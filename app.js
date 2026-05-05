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
