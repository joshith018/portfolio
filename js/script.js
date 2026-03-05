document.addEventListener('DOMContentLoaded', () => {

    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* =========================================
       NAVIGATION SYTLING & MOBILE MENU
       ========================================= */
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const navLinksList = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scrolled Navbar Style
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinksList.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinksList.classList.remove('active');
        });
    });

    /* =========================================
       ACTIVE LINK HIGHLIGHTING
       ========================================= */
    const sections = document.querySelectorAll('section');

    const highlightActiveNav = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset for fixed navbar
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Avoid errors if href doesn't contain the #
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav);

    /* =========================================
       INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
       ========================================= */
    const fadeElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // trigger slightly before element enters
        threshold: 0.1 // percentage of target visibility to trigger
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    /* =========================================
       SMOOTH SCROLLING FOR ANCHOR LINKS
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Account for fixed header
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       PROJECT DETAILS TOGGLE LOGIC
       ========================================= */
    const projectButtons = document.querySelectorAll('.project-overlay .btn');

    projectButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default jump behavior

            // Find the closest project card, then find the details container inside it
            const card = e.target.closest('.project-card');
            const details = card.querySelector('.project-details');

            if (details.style.display === 'none' || details.style.display === '') {
                // Expand
                details.style.display = 'block';
                e.target.textContent = 'Hide Details';
            } else {
                // Collapse
                details.style.display = 'none';
                e.target.textContent = 'View Details';
            }
        });
    });

});
