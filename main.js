// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
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

// Mobile Dropdown accordion toggle for "Products +"
function initMobileNav() {
    const dropdowns = document.querySelectorAll('.nav-links .dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        if (trigger && !trigger.dataset.bound) {
            trigger.dataset.bound = 'true';
            trigger.addEventListener('click', (e) => {
                // If on mobile / narrow screen, toggle the accordion dropdown
                if (window.innerWidth <= 992 || (mobileMenuToggle && window.getComputedStyle(mobileMenuToggle).display !== 'none')) {
                    e.preventDefault();
                    e.stopPropagation();
                    const isOpen = dropdown.classList.toggle('open');
                    dropdown.classList.toggle('active', isOpen);
                }
            });
        }
    });

    // Close mobile menu when clicking any inner dropdown product link or standard menu link
    document.querySelectorAll('.nav-links a').forEach(link => {
        // If it's NOT a top-level dropdown toggle trigger
        if (!link.matches('.dropdown > a')) {
            if (!link.dataset.bound) {
                link.dataset.bound = 'true';
                link.addEventListener('click', () => {
                    if (mobileMenuToggle) {
                        mobileMenuToggle.checked = false;
                    }
                    if (navLinks) {
                        navLinks.classList.remove('active');
                    }
                });
            }
        }
    });

    // Only inject Mail Us item on mobile screens (<= 992px) and remove on desktop
    function updateMobileMailItem() {
        if (!navLinks) return;
        const existingMail = navLinks.querySelector('.mobile-menu-mail-item');
        if (window.innerWidth <= 992) {
            if (!existingMail) {
                const mailLi = document.createElement('li');
                mailLi.className = 'mobile-menu-mail-item';
                mailLi.innerHTML = `
                    <a href="mailto:Contact@kembotpetroleum.com" class="mobile-mail-link">
                        <span style="display:flex; align-items:center; gap:0.6rem;">
                            <span style="font-size:1.15rem; line-height:1;">✉️</span>
                            <span style="display:flex; flex-direction:column; line-height:1.2;">
                                <small style="font-size:0.7rem; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px;">Mail Us</small>
                                <span style="font-size:0.88rem; color:#ff4500; font-weight:700;">Contact@kembotpetroleum.com</span>
                            </span>
                        </span>
                        <span style="font-size:1rem; color:#ff4500;">&rarr;</span>
                    </a>
                `;
                navLinks.appendChild(mailLi);
            }
        } else {
            if (existingMail) {
                existingMail.remove();
            }
        }
    }
    updateMobileMailItem();
    window.addEventListener('resize', updateMobileMailItem);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
} else {
    initMobileNav();
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

// Catalog Toggle and Filter Functions
function toggleAllProducts() {
    const container = document.getElementById('allProductsContainer');
    const btn = document.getElementById('toggleAllProductsBtn');
    if (!container || !btn) return;
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
        btn.innerText = 'Hide Full Catalog \u2191';
        container.scrollIntoView({ behavior: 'smooth' });
    } else {
        container.style.display = 'none';
        btn.innerText = 'View All 27 Products Catalog \u2193';
    }
}

function filterCatalog(category, btn) {
    document.querySelectorAll('.cat-filter-btn').forEach(b => {
        b.style.backgroundColor = '#fff';
        b.style.color = '#475569';
        b.style.borderColor = '#cbd5e1';
    });
    if (btn) {
        btn.style.backgroundColor = '#ff4500';
        btn.style.color = '#fff';
        btn.style.borderColor = '#ff4500';
    }

    const cards = document.querySelectorAll('#catalogGrid .catalog-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        if (category === 'all' || cardCat.includes(category)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// =========================================================================
// GLOBAL INTERACTIVE SEARCH SYSTEM
// =========================================================================
const SITE_SEARCH_INDEX = [
    { name: "Soluble Cutting Oil", cat: "Industrial Oil", desc: "Bio-stable water soluble metal cutting fluid with anti-rust protection.", url: "products/soluble-cutting-oil.html" },
    { name: "Straight / Neat Cutting Oil", cat: "Industrial Oil", desc: "Heavy-duty non-staining neat cutting oil for broaching and deep drilling.", url: "products/straight-cut-oil.html" },
    { name: "Hone Flush Oil & SPL", cat: "Industrial Oil", desc: "Ultra-low viscosity honing oil with flushing action for precision finishing.", url: "products/hone-flush-oil.html" },
    { name: "Loom Oils (Textile Machinery)", cat: "Industrial Oil", desc: "High scourability textile loom oils for high-speed weaving looms.", url: "products/loom-oils.html" },
    { name: "Quenching Oils (Heat Treatment)", cat: "Industrial Oil", desc: "Accelerated quenching and heat treatment oil for uniform hardness.", url: "products/quenching-oil.html" },
    { name: "Pneumatic Tool & Rock Drill Oils", cat: "Industrial Oil", desc: "High film-strength extreme-pressure oils for jackhammers and drills.", url: "products/pneumatic-oils.html" },
    { name: "Slideway Oils (Way Lubricants)", cat: "Industrial Oil", desc: "Tacky anti-stick-slip slideway oil for machine tool guideways.", url: "products/way-oils.html" },
    { name: "Press Oils (Metal Stamping)", cat: "Industrial Oil", desc: "Heavy-duty drawing and sheet metal stamping compounds.", url: "products/press-oils.html" },
    { name: "Freeze Oils (Refrigeration)", cat: "Industrial Oil", desc: "Ultra-low pour point compressor oils for NH3 and CFC systems.", url: "products/freeze-oils.html" },
    { name: "EDM Oil (Spark Erosion Fluid)", cat: "Industrial Oil", desc: "High dielectric strength spark erosion fluid with zero odor.", url: "products/edm-oil.html" },
    { name: "Rust Preventive Oils (RPO Series)", cat: "Industrial Oil", desc: "Dewatering rust preventive fluid for indoor and ocean export storage.", url: "products/rust-preventive-oil.html" },
    { name: "Hydraulic Oils (Standard Anti-Wear)", cat: "Industrial Oil", desc: "ISO VG 32 to 460 anti-wear hydraulic oil for high-pressure systems.", url: "products/hydraulic-oils.html" },
    { name: "Hydraulic Oils HLP Series", cat: "Industrial Oil", desc: "Premium DIN 51524 Part 2 HLP anti-wear hydraulic fluids.", url: "products/hydraulic-oils-hlp.html" },
    { name: "Spindle Oils (High Speed)", cat: "Industrial Oil", desc: "Low viscosity high-speed spindle bearing lubrication.", url: "products/spindle-oils.html" },
    { name: "Machinery Oils (General Lubrication)", cat: "Industrial Oil", desc: "All-round industrial machinery oil for bearings and machine slides.", url: "products/machinery-oils.html" },
    { name: "Industrial Gear Oils & EP Series", cat: "Industrial Oil", desc: "Extreme pressure industrial gear oil for heavy gearboxes and drives.", url: "products/gear-oils.html" },
    { name: "Thermic Fluid (Heat Transfer Oil)", cat: "Industrial Oil", desc: "High thermal stability heat transfer oil operating up to 300°C.", url: "products/thermic-oil.html" },
    { name: "Transformer Oils (Electrical Insulating)", cat: "Industrial Oil", desc: "IEC 60296 uninhibited high dielectric transformer insulating oil.", url: "products/transformer-oils.html" },
    { name: "Glass Cutting Oils", cat: "Industrial Oil", desc: "Residue-free low-surface-tension fluid for automatic glass cutting.", url: "products/glass-cutting-oils.html" },
    { name: "Engine Oils (Linear / Monograde)", cat: "Automotive Oil", desc: "SAE 30, 40, 50 heavy-duty diesel and petrol monograde engine oils.", url: "products/engine-oils-linear.html" },
    { name: "Multi-Grade Engine Oil (Milby)", cat: "Automotive Oil", desc: "20W-40 / 15W-40 multigrade performance motor oil.", url: "products/multi-grade-engine-oil-milby.html" },
    { name: "Multi-Grade Diesel Premium", cat: "Automotive Oil", desc: "15W-40 CI-4/CH-4 heavy commercial fleet diesel engine oil.", url: "products/multi-grade-diesel-premium.html" },
    { name: "4T Motorcycle Oils", cat: "Automotive Oil", desc: "20W-40 4-Stroke JASO MA2 motorcycle lubricant for bikes and scooters.", url: "products/4t-motorcycle-oils.html" },
    { name: "Fork Oil & Front Shock Lubricant", cat: "Automotive Oil", desc: "Anti-foaming front fork damper fluid for two-wheelers.", url: "products/fork-oil.html" },
    { name: "Auto Special Oils (Pump & Gas)", cat: "Automotive Oil", desc: "Specialty agricultural pump set oil and CNG/LPG engine oil.", url: "products/auto-special.html" },
    { name: "Industrial & Automotive Greases", cat: "Greases", desc: "Lithium, AP-3, EP-2, Calcium and high-temp complex greases.", url: "products/industrial-automotive-greases.html" },
    { name: "White Oils (Liquid Paraffin)", cat: "Specialties", desc: "IP/BP/USP pure mineral white oil for cosmetic and industrial use.", url: "products/white-oils.html" },
    { name: "All Products Catalog (Full 27 Range)", cat: "Catalog", desc: "Browse the complete product catalog of all 27 technical formulations and packaging options.", url: "products.html" },
    { name: "Equivalent Cross-Reference Chart", cat: "Tools", desc: "Compare Kembot formulas with HPCL, IOC, Castrol, and Servo grades.", url: "equivalent-chart.html" }
];

function initSearchModal() {
    // If modal doesn't exist, create and append it to body
    if (!document.getElementById('siteSearchModal')) {
        const modal = document.createElement('div');
        modal.id = 'siteSearchModal';
        modal.className = 'site-search-modal';
        
        // Detect if we are in /products/ subdirectory
        const isInProductsDir = window.location.pathname.includes('/products/');
        const prefix = isInProductsDir ? '../' : '';

        modal.innerHTML = `
            <div class="site-search-container" onclick="event.stopPropagation();">
                <div class="site-search-header">
                    <span class="search-input-icon">🔍</span>
                    <input type="text" id="siteSearchInput" class="site-search-input" placeholder="Search lubricants, grades, applications, or brands..." autocomplete="off">
                    <button id="siteSearchClose" class="site-search-close" aria-label="Close search">&times;</button>
                </div>
                <div class="site-search-quick-tags">
                    <span class="tag-label">Popular:</span>
                    <button type="button" data-term="Hydraulic">Hydraulic</button>
                    <button type="button" data-term="Cutting">Cutting Oil</button>
                    <button type="button" data-term="Engine">Engine Oil</button>
                    <button type="button" data-term="Gear">Gear Oil</button>
                    <button type="button" data-term="Grease">Grease</button>
                    <button type="button" data-term="Transformer">Transformer</button>
                </div>
                <div id="siteSearchBody" class="site-search-body">
                    <!-- Results rendered dynamically -->
                </div>
                <div class="site-search-footer">
                    <span>Press <kbd style="background:#e2e8f0; padding:2px 6px; border-radius:4px; font-size:0.75rem;">ESC</kbd> to exit</span>
                    <a href="${prefix}equivalent-chart.html">Open Equivalent Comparison Chart &rarr;</a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const input = modal.querySelector('#siteSearchInput');
        const body = modal.querySelector('#siteSearchBody');
        const closeBtn = modal.querySelector('#siteSearchClose');
        const tagButtons = modal.querySelectorAll('.site-search-quick-tags button');

        function renderResults(query = '') {
            const q = query.trim().toLowerCase();
            let matches = [];
            if (!q) {
                // Show featured/first items when search is empty
                matches = SITE_SEARCH_INDEX.slice(0, 6);
            } else {
                matches = SITE_SEARCH_INDEX.filter(item => 
                    item.name.toLowerCase().includes(q) ||
                    item.cat.toLowerCase().includes(q) ||
                    item.desc.toLowerCase().includes(q)
                );
            }

            if (matches.length === 0) {
                body.innerHTML = `
                    <div class="search-no-results">
                        <div style="font-size:2rem; margin-bottom:0.5rem;">🔍</div>
                        <strong>No direct results found for "${query}"</strong>
                        <p>Try searching for hydraulic, cutting, engine, gear, grease, or consult our <a href="${prefix}equivalent-chart.html" style="color:#ff4500; font-weight:700;">Equivalent Chart</a>.</p>
                    </div>
                `;
                return;
            }

            let html = '';
            matches.forEach(item => {
                const targetUrl = prefix + item.url;
                html += `
                    <a href="${targetUrl}" class="search-result-item">
                        <div class="search-item-info">
                            <span class="search-item-cat">${item.cat}</span>
                            <span class="search-item-title">${item.name}</span>
                            <span class="search-item-desc">${item.desc}</span>
                        </div>
                        <span class="search-item-arrow">&rarr;</span>
                    </a>
                `;
            });
            body.innerHTML = html;
        }

        input.addEventListener('input', (e) => {
            renderResults(e.target.value);
        });

        tagButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const term = btn.getAttribute('data-term');
                input.value = term;
                input.focus();
                renderResults(term);
            });
        });

        function closeModal() {
            modal.classList.remove('active');
        }

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', closeModal);

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Expose renderResults for opening
        modal._render = renderResults;
    }

    // Attach click listener to ALL search icons across header & navbar
    document.querySelectorAll('.search-icon').forEach(icon => {
        if (!icon.dataset.searchBound) {
            icon.dataset.searchBound = 'true';
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const modal = document.getElementById('siteSearchModal');
                if (modal) {
                    modal.classList.add('active');
                    const input = modal.querySelector('#siteSearchInput');
                    if (modal._render) {
                        modal._render(input.value || '');
                    }
                    setTimeout(() => {
                        if (input) input.focus();
                    }, 50);
                }
            });
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchModal);
} else {
    initSearchModal();
}
