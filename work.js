// Configuration initiale
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser tous les composants
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initParallaxEffect();
    initActiveLinkHighlighting();
    initServiceCardAnimations();
    initContactForm();
    initCVDownload();
    initTypingAnimation();
    initDarkModeToggle();
    initProjects();
    initLanguageToggle();
    initBackToTopButton();
    
    // Afficher le body après chargement
    document.body.style.display = 'block';
    
    // Message de bienvenue dans la console
    console.log(
        "%cBienvenue sur le portfolio de OLOJEDE Samuel!",
        "color: #2563EB; font-size: 20px; font-weight: bold;"
    );
    console.log(
        "%cCe site a été conçu avec ❤️ par OLOJEDE Samuel",
        "color: #666; font-size: 14px;"
    );
});

// Menu mobile
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Fermer le menu mobile après clic sur un lien
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Défilement fluide
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Mettre à jour l'URL sans rechargement
                window.history.pushState(null, null, targetId);
            }
        });
    });
}

// Animations au défilement
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const checkVisibility = () => {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('active');
            }
        });
        
        sectionTitles.forEach(title => {
            const titleTop = title.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (titleTop < windowHeight * 0.85) {
                title.classList.add('active');
            }
        });
    };
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}

// Effet parallaxe
function initParallaxEffect() {
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

// Mise en évidence des liens actifs
function initActiveLinkHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightActiveLink = () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    highlightActiveLink();
    window.addEventListener('scroll', highlightActiveLink);
}

// Animations des cartes de service
function initServiceCardAnimations() {
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

// Formulaire de contact avec EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const loadingSpinner = document.getElementById('loading-spinner');
        const formMessage = document.getElementById('form-message');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // État de chargement
            if (btnText) btnText.textContent = getCurrentLanguage() === 'fr' ? 'Envoi en cours...' : 'Sending...';
            if (loadingSpinner) loadingSpinner.classList.remove('hidden');
            if (submitBtn) submitBtn.disabled = true;
            if (formMessage) formMessage.classList.add('hidden');
            
            // Données du formulaire
            const templateParams = {
                from_name: document.getElementById('name')?.value || '',
                from_email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };
            
            console.log("Tentative d'envoi avec paramètres:", templateParams);
            
            // Envoi avec EmailJS
            if (window.emailjs) {
                emailjs.send('service_zmcf9ln', 'template_qtzwcq7', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        if (formMessage) {
                            formMessage.textContent = getCurrentLanguage() === 'fr' ? 
                                'Message envoyé avec succès! Je vous répondrai dès que possible.' : 
                                'Message sent successfully! I will get back to you as soon as possible.';
                            formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-600');
                            formMessage.classList.add('bg-green-100', 'text-green-600', 'animate__animated', 'animate__fadeIn');
                        }
                        
                        contactForm.reset();
                    }, function(error) {
                        console.log('FAILED...', error);
                        
                        if (formMessage) {
                            formMessage.textContent = getCurrentLanguage() === 'fr' ? 
                                "Erreur d'envoi: " + error.text : 
                                "Sending error: " + error.text;
                            formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-600');
                            formMessage.classList.add('bg-red-100', 'text-red-600', 'animate__animated', 'animate__shakeX');
                        }
                    })
                    .finally(function() {
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

// Téléchargement du CV
function initCVDownload() {
    const downloadBtn = document.getElementById('download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            alert(getCurrentLanguage() === 'fr' ? 
                "Le téléchargement du CV sera disponible prochainement." : 
                "CV download will be available soon.");
        });
    }
}

// Animation de frappe
function initTypingAnimation() {
    const headings = document.querySelectorAll('#accueil h1, #accueil h2');
    
    headings.forEach(heading => {
        heading.classList.add('animate__animated', 'animate__fadeInUp');
    });
}

// Basculer entre les modes sombre/clair
function initDarkModeToggle() {
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
    
    const isDarkMode = document.documentElement.classList.contains('dark');
    updateIcons(isDarkMode);
    
    darkModeButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                const isDark = document.documentElement.classList.toggle('dark');
                updateIcons(isDark);
                document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            });
        }
    });
}

// Gestion des projets
function initProjects() {
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

    function equalizeCardHeights() {
        const container = document.querySelector('.projects-grid');
        if (!container) return;

        const cards = container.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.style.height = 'auto';
        });

        let maxHeight = 0;
        cards.forEach(card => {
            maxHeight = Math.max(maxHeight, card.offsetHeight);
        });

        if (maxHeight > 0) {
            cards.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        }
    }

    window.addEventListener('load', equalizeCardHeights);
    window.addEventListener('resize', equalizeCardHeights);
}

// Obtenir la langue actuelle
function getCurrentLanguage() {
    const select = document.getElementById('language-select');
    return select ? select.value : 'fr';
}

// Mettre à jour le texte selon la langue
function updateTextForLanguage(language) {
    document.querySelectorAll('[data-fr][data-en]').forEach(element => {
        const textValue = element.getAttribute(`data-${language}`);
        if (textValue) {
            element.textContent = textValue;
        }
    });
}

// Basculer entre les langues
function initLanguageToggle() {
    const languageSelects = [
        document.getElementById('language-select'),
        document.getElementById('language-select-mobile')
    ];
    
    languageSelects.forEach(select => {
        if (select) {
            select.addEventListener('change', () => {
                const language = select.value;
                
                languageSelects.forEach(otherSelect => {
                    if (otherSelect && otherSelect !== select) {
                        otherSelect.value = language;
                    }
                });
                
                updateTextForLanguage(language);
                
                const btnText = document.getElementById('btn-text');
                if (btnText) {
                    const btnTextContent = btnText.getAttribute(`data-${language}`);
                    if (btnTextContent) {
                        btnText.textContent = btnTextContent;
                    }
                }

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

// Bouton retour en haut
function initBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        const toggleButtonVisibility = () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        };
        
        toggleButtonVisibility();
        window.addEventListener('scroll', toggleButtonVisibility);
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Protection contre l'inspection
document.addEventListener("contextmenu", event => event.preventDefault());
document.addEventListener("keydown", event => {
    if (
        event.ctrlKey ||
        event.key === "F12" ||
        event.key === "F5" ||
        (event.ctrlKey && event.key === "s") ||
        (event.ctrlKey && event.key === "u") ||
        (event.ctrlKey && event.shiftKey && event.key === "i") ||
        (event.ctrlKey && event.shiftKey && event.key === "c") ||
        (event.ctrlKey && event.shiftKey && event.key === "j")
    ) {
        event.preventDefault();
    }
});
