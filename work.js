// Désactiver le menu contextuel et certaines combinaisons de touches
document.addEventListener("contextmenu", event => event.preventDefault());
document.addEventListener("keydown", event => {
    if (
        event.ctrlKey || // Bloque toutes les touches avec "Ctrl"
        event.key === "F12" || // Bloque F12 (Outils dev)
        event.key === "F5" || // Bloque F5 (Rafraîchissement)
        (event.ctrlKey && event.key === "s") || // Bloque Ctrl + S (Enregistrement)
        (event.ctrlKey && event.key === "u") || // Bloque Ctrl + U (Code source)
        (event.ctrlKey && event.shiftKey && event.key === "i") || // Bloque Ctrl + Shift + I (Outils dev)
        (event.ctrlKey && event.shiftKey && event.key === "c") || // Bloque Ctrl + Shift + C (Inspecteur)
        (event.ctrlKey && event.shiftKey && event.key === "j") // Bloque Ctrl + Shift + J (Console JS)
    ) {
        event.preventDefault();
    }
});

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to target with offset for header
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                window.history.pushState(null, null, targetId);
            }
        });
    });
}

// Enhanced scroll animations
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const checkVisibility = () => {
        // Animate elements when they come into view
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
        
        // Animate section titles separately
        sectionTitles.forEach(title => {
            const titleTop = title.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (titleTop < windowHeight * 0.9) {
                title.classList.add('active');
            } else {
                title.classList.remove('active');
            }
        });
    };
    
    // Run on initial load
    checkVisibility();
    
    // Run on scroll
    window.addEventListener('scroll', checkVisibility);
}

// Parallax effect
function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = 0.05;
            const offset = scrollPosition * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Active menu link highlighting based on scroll position
function setupActiveLinkHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightActiveLink = () => {
        const scrollPosition = window.scrollY + 100; // Adjust for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    // Run on initial load
    highlightActiveLink();
    
    // Run on scroll
    window.addEventListener('scroll', highlightActiveLink);
}

// Interactive animations for service cards
function setupServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.service-icon').classList.add('animate__animated', 'animate__heartBeat');
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            icon.classList.remove('animate__animated', 'animate__heartBeat');
        });
    });
}

// Contact form submission with EmailJS
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            btnText.textContent = 'Envoi en cours...';
            loadingSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
            formMessage.classList.add('hidden');
            
            // Get form data
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Log parameters for verification
            console.log("Tentative d'envoi avec paramètres:", templateParams);
            
            // Send email with EmailJS
            emailjs.send('service_zmcf9ln', 'template_qtzwcq7', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message with animation
                    formMessage.textContent = 'Message envoyé avec succès! Je vous répondrai dès que possible.';
                    formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-600');
                    formMessage.classList.add('bg-green-100', 'text-green-600', 'animate__animated', 'animate__fadeIn');
                    
                    // Reset form
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message with animation
                    formMessage.textContent = 'Erreur d\'envoi: ' + error.text;
                    formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-600');
                    formMessage.classList.add('bg-red-100', 'text-red-600', 'animate__animated', 'animate__shakeX');
                })
                .finally(function() {
                    // Reset button state
                    btnText.textContent = 'Envoyer le message';
                    loadingSpinner.classList.add('hidden');
                    submitBtn.disabled = false;
                });
        });
    }
}

// CV Download button
function setupCVDownload() {
    const downloadBtn = document.getElementById('download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Alert user that CV is not available
            alert("Le téléchargement du CV sera disponible prochainement.");
            
            // Or use this to provide a real CV download
            // window.location.href = 'path/to/your/cv.pdf';
        });
    }
}

// Add typing animation to the hero section
function setupTypingAnimation() {
    const headings = document.querySelectorAll('#accueil h1, #accueil h2');
    
    headings.forEach(heading => {
        heading.classList.add('animate__animated', 'animate__fadeInUp');
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup all functions
    setupMobileMenu();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupParallaxEffect();
    setupActiveLinkHighlighting();
    setupServiceCardAnimations();
    setupContactForm();
    setupCVDownload();
    setupTypingAnimation();
    
    // Finally, make the body visible
    document.body.style.display = 'block';
    
    // Add a welcome console message
    console.log(
        "%cBienvenue sur le portfolio de OLOJEDE Samuel!",
        "color: #2563EB; font-size: 20px; font-weight: bold;"
    );
    console.log(
       "%cCe site a été conçu avec  par OLOJEDE Samuel",
     
    );
});

// Add some additional scroll-triggered animations
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    // Parallax for profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        const rotation = scrollPosition * 0.02;
        profileImage.style.transform = `rotate(${rotation}deg)`;
    }

    // Fade in elements gradually as user scrolls
    const fadeElements = document.querySelectorAll('.animate__fadeIn');
    fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight * 0.8) {
            const opacity = 1 - (elementPosition / (windowHeight * 0.8));
            element.style.opacity = Math.max(0, Math.min(1, opacity));
        }
    });
});

// Dark mode toggle
function setupDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check if dark mode is enabled in local storage
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'enabled';

    if (isDarkModeEnabled) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.removeItem('darkMode');
        }
    });
}

// Initialize dark mode toggle
setupDarkModeToggle();

// Add a tooltip effect for buttons and links
function setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip');
        tooltip.textContent = tooltipText;
        element.appendChild(tooltip);

        element.addEventListener('mouseenter', () => {
            tooltip.classList.add('active');
        });

        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
    });
}

// Initialize tooltips
setupTooltips();

// Add a back-to-top button
function setupBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.textContent = ' Haut';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
}

// Initialize back-to-top button
setupBackToTopButton();