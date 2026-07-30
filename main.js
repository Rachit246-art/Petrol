// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        navLinks.classList.contains('active') ? 
            spans.forEach(s => s.style.backgroundColor = 'var(--accent)') :
            spans.forEach(s => s.style.backgroundColor = 'var(--text-main)');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(s => s.style.backgroundColor = 'var(--text-main)');
        });
    });
}

// Simple reveal on scroll animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles and observe elements
document.querySelectorAll('.service-card, .about-text, .about-image-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Services Carousel Logic
const slides = document.querySelectorAll('.services-grid-new.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideNum = document.getElementById('slideNum');

if (slides.length > 0 && prevBtn && nextBtn) {
    let currentSlide = 0;
    
    function updateCarousel() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.display = 'grid';
                slide.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                slide.style.display = 'none';
            }
        });
        slideNum.innerText = `0${currentSlide + 1}`;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });
}
