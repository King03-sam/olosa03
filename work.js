document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scrolling
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
                
                window.history.pushState(null, null, targetId);
            }
        });
    });

    // Scroll animations
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

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = 0.05;
            const offset = scrollPosition * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });

    // Active link highlighting
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

    // Service card animations
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

    // Contact form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const loadingSpinner = document.getElementById('loading-spinner');
        const formMessage = document.getElementById('form-message');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (btnText) btnText.textContent = getCurrentLanguage() === 'fr' ? 'Envoi en cours...' : 'Sending...';
            if (loadingSpinner) loadingSpinner.classList.remove('hidden');
            if (submitBtn) submitBtn.disabled = true;
            if (formMessage) formMessage.classList.add('hidden');
            
            const templateParams = {
                from_name: document.getElementById('name')?.value || '',
                from_email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };
            
            if (window.emailjs) {
                emailjs.send('service_zmcf9ln', 'template_qtzwcq7', templateParams)
                    .then(function(response) {
                        if (formMessage) {
                            formMessage.textContent = getCurrentLanguage() === 'fr' ? 
                                'Message envoyé avec succès!' : 
                                'Message sent successfully!';
                            formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-600');
                            formMessage.classList.add('bg-green-100', 'text-green-600');
                        }
                        
                        contactForm.reset();
                    }, function(error) {
                        if (formMessage) {
                            formMessage.textContent = getCurrentLanguage() === 'fr' ? 
                                "Erreur d'envoi" : 
                                "Sending error";
                            formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-600');
                            formMessage.classList.add('bg-red-100', 'text-red-600');
                        }
                    })
                    .finally(function() {
                        if (btnText) {
                            btnText.textContent = getCurrentLanguage() === 'fr' ? 
                                'Envoyer le message' : 'Send message';
                        }
                        if (loadingSpinner) loadingSpinner.classList.add('hidden');
                        if (submitBtn) submitBtn.disabled = false;
                    });
            }
        });
    }

    // CV download
    const downloadBtn = document.getElementById('download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert(getCurrentLanguage() === 'fr' ? 
                "CV disponible prochainement" : 
                "CV coming soon");
        });
    }

    // Dark mode toggle
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
            });
        }
    });

    // Language toggle
    function getCurrentLanguage() {
        const select = document.getElementById('language-select');
        return select ? select.value : 'fr';
    }

    function updateTextForLanguage(language) {
        document.querySelectorAll('[data-fr][data-en]').forEach(element => {
            const textValue = element.getAttribute(`data-${language}`);
            if (textValue) {
                element.textContent = textValue;
            }
        });
    }

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
            });
        }
    });

    // Back to top button
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

    // Protection
    document.addEventListener("contextmenu", event => event.preventDefault());
    document.addEventListener("keydown", event => {
        if (event.ctrlKey || event.key === "F12") {
            event.preventDefault();
        }
    });

    // Show body
    document.body.style.display = 'block';
});
