// Enhanced Portfolio JavaScript with Modern Features

// --- UPDATED THEME MANAGER FOR NEW TOGGLE ---
class ThemeManager {
    constructor() {
        // this.changeVideo = document.querySelector('#logo-video')
        this.themeToggle = document.querySelector('.theme-switch__checkbox');
        if (!this.themeToggle) {
            console.error("Theme toggle checkbox (.theme-switch__checkbox) not found!");
            return;
        }
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    init() {
        this.setTheme(this.theme);
        this.themeToggle.addEventListener('change', () => {
            this.handleThemeChange()
            
            
        });
    }
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
        if (this.themeToggle) {
            this.themeToggle.checked = (theme === 'dark');
        }
    }
    handleThemeChange() {
        const newTheme = this.themeToggle.checked ? 'dark' : 'light';
        const changingVideo = document.getElementById('logo-video')
        changingVideo.load()
        if(newTheme === 'dark'){
            changingVideo.src="public/darkTheme.mp4"
            changingVideo.load()
            console.log(changingVideo);
            
        }else{
            changingVideo.src="public/lightTheme.mp4"
            changingVideo.load()

        }
        this.setTheme(newTheme);
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}
function stopLogo(){
    const logoVideo = document.getElementById('logo-video');
    const time = 2
    
    logoVideo.addEventListener("click",()=>{
       
        window.location.href="#home"
    })
}
stopLogo()
// Enhanced Navigation Manager (Now safer)
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        // Only run if the essential elements exist
        if (this.navToggle && this.navMenu) {
            this.init();
        }
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
    }

    setupMobileMenu() {
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (this.navbar && !this.navbar.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            }
        });
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', this.throttle(() => {
            const currentScrollY = window.scrollY;
            if (this.navbar) {
                if (currentScrollY > 50) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
                
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    this.navbar.style.transform = 'translateY(-100%)';
                } else {
                    this.navbar.style.transform = 'translateY(0)';
                }
            }
            lastScrollY = currentScrollY;
        }, 16));
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupActiveNavigation() {
        if (this.sections.length === 0) return;
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(id);
                }
            });
        }, observerOptions);

        this.sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

function arrowNavigator(){
    const arrow = document.querySelector(".scroll-arrow")
    arrow.addEventListener('click',function(){
        console.log("clicked");
        window.location.href ="#about"
    })
}
arrowNavigator()

// Enhanced Animation Manager (Now safer)
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollRevealAnimations();
        this.setupInteractiveAnimations();
        this.setupLoadingAnimation();
    }

    setupScrollRevealAnimations() {
        const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
        if (elementsToReveal.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Stop observing after revealed
                }
            });
        }, { threshold: 0.1 });

        elementsToReveal.forEach(el => observer.observe(el));
    }
    
    // other AnimationManager methods...
    setupInteractiveAnimations() {}
    
    setupLoadingAnimation() {
        const loadingScreen = document.getElementById('loader-container');
        const mainContent = document.getElementById('main-content');
    
        // If there's no loading screen, just make sure the content is visible.
        if (!loadingScreen || !mainContent) {
            if (mainContent) mainContent.style.opacity = '1';
            this.triggerHeroAnimations();
            return;
        }
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                mainContent.style.opacity = '1';
                this.triggerHeroAnimations();
            }, 500); // 500ms minimum display time
        });
    }

    triggerHeroAnimations() {
        const heroElements = document.querySelectorAll('.fade-in-up');
        heroElements.forEach((element, index) => {
            element.style.transitionDelay = `${index * 200}ms`;
            element.classList.add('animate');
        });
    }
    // ... rest of AnimationManager methods (createRippleEffect, etc.) can stay the same
}

// ... Rest of the classes (ScrollEffectsManager, TypingAnimation, etc.)
// can remain as they are, but it's good practice to add similar checks.

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
    // new ScrollEffectsManager(); // You can enable these as you add the HTML for them
    // new PerformanceMonitor();
    // new AccessibilityManager();

    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // The TypingAnimation class needs to be defined for this to work
        // new TypingAnimation(heroTitle, originalText, { speed: 150, delay: 1500 });
    }
});