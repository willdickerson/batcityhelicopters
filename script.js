// ===================================
// BAT CITY HELICOPTERS - SCRIPTS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    
    const handleScroll = () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Tour gallery functionality - Hill Country
    const galleryMain = document.getElementById('gallery-main');
    const hillCountryThumbs = document.querySelectorAll('.thumb:not([data-gallery])');
    
    hillCountryThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const newSrc = thumb.dataset.img;
            galleryMain.style.opacity = '0';
            
            setTimeout(() => {
                galleryMain.src = newSrc;
                galleryMain.style.opacity = '1';
            }, 200);
            
            hillCountryThumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Tour gallery functionality - Austin Skyline
    const galleryMainSkyline = document.getElementById('gallery-main-skyline');
    const skylineThumbs = document.querySelectorAll('.thumb[data-gallery="skyline"]');
    
    skylineThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const newSrc = thumb.dataset.img;
            galleryMainSkyline.style.opacity = '0';
            
            setTimeout(() => {
                galleryMainSkyline.src = newSrc;
                galleryMainSkyline.style.opacity = '1';
            }, 200);
            
            skylineThumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.tour-card, .aircraft-card, .testimonial-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Stats counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-bar');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const hasPlus = text.includes('+');
            const hasPercent = text.includes('%');
            const num = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (isNaN(num)) return;
            
            let current = 0;
            const increment = num / 50;
            const duration = 1500;
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= num) {
                    current = num;
                    clearInterval(timer);
                }
                
                let display = Math.floor(current);
                if (hasPlus) display += '+';
                if (hasPercent) display += '%';
                
                stat.textContent = display;
            }, stepTime);
        });
    }

    // Parallax effect for hero
    const heroBackground = document.querySelector('.hero-bg img');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                heroBackground.style.transform = `scale(1.1) translateY(${rate}px)`;
            }
        });
    }

});

