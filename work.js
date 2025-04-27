// work.js - Script pour le portfolio de OLOJEDE Samuel

// Document ready function
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
    setupDarkModeToggle();
    setupProjects();
    setupLanguageToggle();
    setupBackToTopButton();
    
    // Finally, make the body visible
    document.body.style.display = 'block';
    
    // Add a welcome console message
    console.log(
        "%cBienvenue sur le portfolio de OLOJEDE Samuel!",
        "color: #2563EB; font-size: 20px; font-weight: bold;"
    );
    console.log(
        "%cCe site a été conçu avec ❤️ par OLOJEDE Samuel"
    );
});

// Mobile menu toggle (Mobile)
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
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
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('active');
            }
        });
        
        // Animate section titles separately
        sectionTitles.forEach(title => {
            const titleTop = title.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (titleTop < windowHeight * 0.85) {
                title.classList.add('active');
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
        const icon = card.querySelector('.service-icon');
        if (icon) {
            card.addEventListener('mouseenter', () => {
                icon.classList.add('animate__animated', 'animate__heartBeat');
            });
            
            card.addEventListener('mouseleave', () => {
                icon.classList.remove('animate__animated', 'animate__heartBeat');
            });
        }
    });
}

// Contact form submission with EmailJS
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const loadingSpinner = document.getElementById('loading-spinner');
        const formMessage = document.getElementById('form-message');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            if (btnText) btnText.textContent = getCurrentLanguage() === 'fr' ? 'Envoi en cours...' : 'Sending...';
            if (loadingSpinner) loadingSpinner.classList.remove('hidden');
            if (submitBtn) submitBtn.disabled = true;
            if (formMessage) formMessage.classList.add('hidden');
            
            // Get form data
            const templateParams = {
                from_name: document.getElementById('name')?.value || '',
                from_email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };
            
            // Log parameters for verification
            console.log("Tentative d'envoi avec paramètres:", templateParams);
            
            // Send email with EmailJS
            if (window.emailjs) {
                emailjs.send('service_zmcf9ln', 'template_qtzwcq7', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Show success message with animation
                        if (formMessage) {
                            formMessage.textContent = getCurrentLanguage() === 'fr' ? 
                                'Message envoyé avec succès! Je vous répondrai dès que possible.' : 
                                'Message sent successfully! I will get back to you as soon as possible.';
                            formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-600');
                            formMessage.classList.add('bg-green-100', 'text-green-600', 'animate__animated', 'animate__fadeIn');
                        }
                        
                        // Reset form
                        contactForm.reset();
                    }, function(error) {
                        console.log('FAILED...', error);
                        
                        // Show error message with animation
                        if (formMessage) {
                            formMessage.textContent = getCurrentLanguage() === 'fr' ? 
                                "Erreur d'envoi: " + error.text : 
                                "Sending error: " + error.text;
                            formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-600');
                            formMessage.classList.add('bg-red-100', 'text-red-600', 'animate__animated', 'animate__shakeX');
                        }
                    })
                    .finally(function() {
                        // Reset button state
                        if (btnText) {
                            const btnTextContent = btnText.getAttribute('data-' + getCurrentLanguage());
                            btnText.textContent = btnTextContent || (getCurrentLanguage() === 'fr' ? 'Envoyer le message' : 'Send message');
                        }
                        if (loadingSpinner) loadingSpinner.classList.add('hidden');
                        if (submitBtn) submitBtn.disabled = false;
                    });
            } else {
                console.error("EmailJS n'est pas chargé");
                if (formMessage) {
                    formMessage.textContent = getCurrentLanguage() === 'fr' ? 
                        "Erreur: EmailJS n'est pas disponible" : 
                        "Error: EmailJS is not available";
                    formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-600');
                    formMessage.classList.add('bg-red-100', 'text-red-600', 'animate__animated', 'animate__shakeX');
                }
                
                if (btnText) {
                    const btnTextContent = btnText.getAttribute('data-' + getCurrentLanguage());
                    btnText.textContent = btnTextContent || (getCurrentLanguage() === 'fr' ? 'Envoyer le message' : 'Send message');
                }
                if (loadingSpinner) loadingSpinner.classList.add('hidden');
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }
}

// CV Download button
function setupCVDownload() {
    const downloadBtn = document.getElementById('download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            alert(getCurrentLanguage() === 'fr' ? 
                "Le téléchargement du CV sera disponible prochainement." : 
                "CV download will be available soon.");
            
            // Alternative pour un vrai téléchargement
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

// Dark mode toggle function
function setupDarkModeToggle() {
    const darkModeButtons = [
        document.getElementById('dark-mode-button'),
        document.getElementById('dark-mode-button-mobile')
    ];
    
    const updateIcons = (isDark) => {
        document.querySelectorAll('#dark-icon, #dark-icon-mobile').forEach(icon => {
            icon.classList.toggle('hidden', isDark);
        });
        document.querySelectorAll('#light-icon, #light-icon-mobile').forEach(icon => {
            icon.classList.toggle('hidden', !isDark);
        });
    };
    
    // Vérifier si le mode sombre est activé
    const isDarkMode = document.documentElement.classList.contains('dark');
    updateIcons(isDarkMode);
    
    darkModeButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                const isDark = document.documentElement.classList.toggle('dark');
                updateIcons(isDark);
                
                // Effet de transition
                document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            });
        }
    });
}

// Fonction pour les projets
function setupProjects() {
    // Animation des liens de projet
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });

    // Assurer que les cartes de projet ont la même hauteur dans chaque rangée
    function equalizeCardHeights() {
        const container = document.querySelector('.projects-grid');
        if (!container) return;

        // Réinitialiser les hauteurs
        const cards = container.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.style.height = 'auto';
        });

        // Calculer la nouvelle hauteur
        let maxHeight = 0;
        cards.forEach(card => {
            maxHeight = Math.max(maxHeight, card.offsetHeight);
        });

        // Appliquer la hauteur maximale
        if (maxHeight > 0) {
            cards.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        }
    }

    // Appliquer au chargement et au redimensionnement
    window.addEventListener('load', equalizeCardHeights);
    window.addEventListener('resize', equalizeCardHeights);
}

// Get current language
function getCurrentLanguage() {
    const select = document.getElementById('language-select');
    return select ? select.value : 'fr';
}

// Update text based on language
function updateTextForLanguage(language) {
    document.querySelectorAll('[data-fr][data-en]').forEach(element => {
        const textValue = element.getAttribute(`data-${language}`);
        if (textValue) {
            element.textContent = textValue;
        }
    });
}

// Setup language toggle
function setupLanguageToggle() {
    const languageSelects = [
        document.getElementById('language-select'),
        document.getElementById('language-select-mobile')
    ];
    
    languageSelects.forEach(select => {
        if (select) {
            select.addEventListener('change', () => {
                const language = select.value;
                
                // Synchronize the other select
                languageSelects.forEach(otherSelect => {
                    if (otherSelect && otherSelect !== select) {
                        otherSelect.value = language;
                    }
                });
                
                // Update all text elements with the selected language
                updateTextForLanguage(language);
                
                // Update button text immediately
                const btnText = document.getElementById('btn-text');
                if (btnText) {
                    const btnTextContent = btnText.getAttribute(`data-${language}`);
                    if (btnTextContent) {
                        btnText.textContent = btnTextContent;
                    }
                }

                // Mettre à jour le texte des liens de projet
                const projectLinks = document.querySelectorAll('.project-link');
                projectLinks.forEach(link => {
                    const linkText = link.getAttribute(`data-${language}`);
                    if (linkText && link.querySelector('span')) {
                        link.querySelector('span').textContent = linkText;
                    }
                });
            });
        }
    });
}

// Back to top button
function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        const toggleButtonVisibility = () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        };
        
        // Initial state
        toggleButtonVisibility();
        
        // Update on scroll
        window.addEventListener('scroll', toggleButtonVisibility);
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Bloquer le menu contextuel et les raccourcis clavier
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
