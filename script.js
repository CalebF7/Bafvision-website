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
            
            // FIX: Only attempt smooth scroll and menu close if the href target exists on the page
            // On gallery.html, links like #about or #services will still attempt to scroll, 
            // but the menu will still close for any successful internal anchor click.

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close the menu on link click
                const nav = document.querySelector('.main-nav');
                if (nav) {
                    nav.classList.remove('active');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // Handle navigation to other pages (like index.html#about)
                // We'll let the default link behavior continue if the target isn't on this page.
                // However, since we used e.preventDefault() at the top, we must manually navigate.
                // Since this logic is getting complicated for a multi-page site, let's revert to a simpler approach 
                // that focuses on fixing the menu-toggle conflict.
            }

            // A cleaner approach for multi-page nav with smooth-scrolling:
            // Since links like 'index.html#about' should navigate first, then scroll,
            // we should only preventDefault() and close the menu for *internal* page anchors.

            // The main problem is the menuToggle logic is separate, but we must ensure it's not affected 
            // by unrelated click events. The existing Hamburger Menu Functionality code is fine:
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