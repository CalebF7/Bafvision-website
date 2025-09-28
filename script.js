document.addEventListener('DOMContentLoaded', () => { 
    // Initialize AOS library
    AOS.init({
        duration: 1000, 
        once: false
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close the menu on link click
            const nav = document.querySelector('.main-nav');
            if (nav) {
                nav.classList.remove('active');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    console.log("BAFVISION Website is live!");

    // Refactored Modal functionality using event delegation
    document.addEventListener('click', (e) => {
        // Open modal when a 'learn-more-btn' is clicked
        if (e.target.classList.contains('learn-more-btn')) {
            const modalId = e.target.getAttribute('data-target');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        }
        
        // Close modal when a 'close-btn' is clicked
        if (e.target.classList.contains('close-btn')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        }

        // Close modal when clicking outside of it (on the backdrop)
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Hamburger Menu Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // New: Intersection Observer to re-animate sections
    const sectionsToAnimate = document.querySelectorAll('#about, #services');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                AOS.refresh();
            }
        });
    }, {
        threshold: 0.2 // Triggers when 20% of the element is visible
    });

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
});