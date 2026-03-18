import './styles/main.css';

// ============================================
// JOHN DOE SUPPLY CO. — MAIN APPLICATION 
// Router, Age Gate, Modal, Pages, Interactions
// ============================================

// --- Data ---
const STRAINS = [
  { id: 'kamikaze-candy', name: 'Kamikaze Candy', lineage: 'Kamikaze x Always Faded', type: 'flower', desc: 'The sweet side of destruction. Candy terps, Kamikaze power. "Always Faded" collab.', thc: '24-28%', image: '/assets/kamikaze-candy-jar.png' },
  { id: 'white-kamikaze', name: 'White Kamikaze', lineage: 'Kamikaze Pheno', type: 'flower', desc: 'Crystal coated and lethal. The cleanest cut of the legend.', thc: '26-30%', image: '/assets/white-kamikaze-jars.png' },
  { id: 'kookiez', name: 'Kookiez', lineage: 'Kamikaze x Thin Mint Cookies', type: 'flower', desc: 'Heavy GSC lean with a Zkittlez twist. Creamy, minty, unforgettable.', thc: '24-28%', image: '/assets/kookiez-jar.png' },
  { id: 'kamikaze', name: 'Kamikaze', lineage: 'Zkittlez Cross', type: 'flower', desc: 'The flagship. Sharp flavor, bold aroma, smooth finish.', thc: '22-26%', image: '/assets/kamikaze-jar.png' },
  { id: 'dog-food', name: 'Dog Food', lineage: 'Exclusive Cross', type: 'flower', desc: 'Raw, pungent, and heavy-hitting. For the real ones only.', thc: '25-29%', image: '/assets/headcrack-jar.png' },
  { id: 'frog-food', name: 'Frog Food', lineage: 'Exclusive Pheno', type: 'flower', desc: 'Unique profile, sticky resin, pure potency.', thc: '23-27%', image: '/assets/jars-lineup.png' },
];

const COUNTRIES = [
  { id: 'usa', name: 'United States', code: 'US', status: 'Available', flag: '🇺🇸', desc: 'Born in NorCal, distributed across the Golden State and beyond. Living soil roots run deep in American soil.', image: '/assets/country-usa.jpg' },
  { id: 'canada', name: 'Canada', code: 'CA', status: 'Available', flag: '🇨🇦', desc: 'From the redwoods to the Rockies. John Doe genetics cross the northern border with full force.', image: '/assets/country-canada.jpg' },
  { id: 'thailand', name: 'Thailand', code: 'TH', status: 'Available', flag: '🇹🇭', desc: 'Southeast Asia meets NorCal craft. Kamikaze lands in the Land of Smiles.', image: '/assets/country-thailand.jpg' },
  { id: 'france', name: 'France', code: 'FR', status: 'Available', flag: '🇫🇷', desc: 'Parisian nights meet NorCal craft. John Doe Genetics is now accessible across France.', image: '/assets/country-france.jpg' },
  { id: 'germany', name: 'Germany', code: 'DE', status: 'Available', flag: '🇩🇪', desc: 'The Ghost Brand lands in the heart of Europe. Quality recognized by the connoisseurs of Berlin and beyond.', image: '/assets/country-germany.jpg' },
  { id: 'italy', name: 'Italy', code: 'IT', status: 'Coming Soon', flag: '🇮🇹', desc: 'Mediterranean sun meets NorCal soil. The ghost brand is crossing the Alps.', image: '/assets/country-italy.jpg' },
  { id: 'switzerland', name: 'Switzerland', code: 'CH', status: 'Coming Soon', flag: '🇨🇭', desc: 'Swiss precision meets living soil craft. Pure quality heading to the Alps.', image: '/assets/country-switzerland.jpg' },
  { id: 'holland', name: 'Holland', code: 'NL', status: 'Coming Soon', flag: '🇳🇱', desc: 'The spiritual home of European cannabis welcomes the next generation of genetics.', image: '/assets/country-holland.jpg' },
  { id: 'ireland', name: 'Ireland', code: 'IE', status: 'Coming Soon', flag: '🇮🇪', desc: 'The Emerald Isle welcomes the ghost brand. Quality recognizes quality.' },
  { id: 'uk', name: 'United Kingdom', code: 'UK', status: 'Coming Soon', flag: '🇬🇧', desc: 'London calling. John Doe answers. Premium genetics heading across the Atlantic.' },
  { id: 'spain', name: 'Spain', code: 'ES', status: 'Coming Soon', flag: '🇪🇸', desc: 'Mediterranean sun meets Humboldt soil craft. The ghost brand goes Iberian.' },
];

const MERCH_ITEMS = [
  { id: 'm1', name: 'Skull Tee', price: 35.00, badge: 'BEST SELLER', icon: '👕' },
  { id: 'm2', name: 'Ghost Brand Hoodie', price: 79.95, badge: 'NEW DROP', icon: '🧥' },
  { id: 'm3', name: 'Kamikaze Cap', price: 29.95, badge: null, icon: '🧢' },
  { id: 'm4', name: 'Supply Co. Snapback', price: 26.95, badge: null, icon: '🧢' },
  { id: 'm5', name: 'Camo Crewneck', price: 65.00, badge: null, icon: '🧥' },
  { id: 'm6', name: 'No Identity Tee', price: 35.00, badge: 'NEW', icon: '👕' },
  { id: 'm7', name: 'Living Soil Tee', price: 35.00, badge: null, icon: '👕' },
  { id: 'm8', name: 'Ghost Sticker Pack', price: 12.00, badge: null, icon: '🏷️' },
];

const GALLERY_ITEMS = [
  { title: 'The Lineup', image: '/assets/jars-lineup.png' },
  { title: 'Kamikaze Candy Jar', image: '/assets/kamikaze-candy-jar.png' },
  { title: 'Kookiez Box', image: '/assets/kookiez-box.png' },
  { title: 'White Kamikaze', image: '/assets/white-kamikaze-jars.png' },
  { title: 'Kamikaze Box', image: '/assets/kamikaze-box.png' },
  { title: 'Always Faded Lid', image: '/assets/kamikaze-candy-lid.png' },
  { title: 'Kamikaze Candy Pouch', image: '/assets/kamikaze-candy-pouch.png' },
  { title: 'Kookiez Jar', image: '/assets/kookiez-jar.png' },
  { title: 'Head Crack Candy', image: '/assets/headcrack-jar.png' },
];

// --- App State ---
let currentPage = '';
let heroSlide = 0;
let heroInterval = null;
let cart = [];

// --- Cart Functions ---
function addToCart(itemId) {
  const item = MERCH_ITEMS.find(m => m.id === itemId);
  if (!item) return;
  
  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCartUI();
  showCartToast(item.name);
}

function updateCartUI() {
  const cartCount = document.querySelectorAll('.cart-count');
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.forEach(el => el.textContent = count);
}

function showCartToast(itemName) {
  const toast = document.createElement('div');
  toast.className = 'cart-toast';
  toast.innerHTML = `<span>+ ${itemName} added to crew stash</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// --- Router ---
function router() {
  const hash = window.location.hash || '#/';
  const path = hash.replace('#', '');
  const app = document.getElementById('app');

  // Clear hero interval
  if (heroInterval) {
    clearInterval(heroInterval);
    heroInterval = null;
  }

  if (path === '/' || path === '') {
    app.innerHTML = renderHome();
    currentPage = 'home';
    initHeroCarousel();
    initCountryCarousel();
  } else if (path === '/flower') {
    app.innerHTML = renderFlower();
    currentPage = 'flower';
  } else if (path === '/store-locator') {
    app.innerHTML = renderStoreLocator();
    currentPage = 'store-locator';
    initWorldMap();
  } else if (path === '/about') {
    app.innerHTML = renderAbout();
    currentPage = 'about';
  } else if (path === '/gallery') {
    app.innerHTML = renderGallery();
    currentPage = 'gallery';
  } else if (path === '/contact') {
    app.innerHTML = renderContact();
    currentPage = 'contact';
  } else if (path === '/merch') {
    app.innerHTML = renderMerch();
    currentPage = 'merch';
    initMerchListeners();
  } else if (path.startsWith('/country/')) {
    const countryId = path.split('/country/')[1];
    app.innerHTML = renderCountry(countryId);
    currentPage = 'country';
  }

  // Close nav
  document.getElementById('main-nav')?.classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Init scroll animations
  setTimeout(initScrollAnimations, 100);
}

// --- Page Renderers ---
function renderHome() {
  const HERO_BGS = [
    '/assets/hero-1.png',
    '/assets/hero-2.png',
    '/assets/hero-3.png'
  ];
  return `
    <section class="hero hero--home">
      <div class="hero__slides">
        ${HERO_BGS.map((bg, i) => `
          <div class="hero__slide ${i === 0 ? 'active' : ''}" data-slide="${i}" style="background-image: url('${bg}'); background-size: cover; background-position: center;">
            <div class="hero__slide-content">
              <!-- Text and emojis removed for ultra premium visual focus -->
            </div>
          </div>
        `).join('')}
      </div>
      <div class="hero__dots">
        ${STRAINS.slice(0, 3).map((_, i) => `
          <div class="hero__dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></div>
        `).join('')}
      </div>
    </section>

    <section class="products-section animate-on-scroll">
      <div class="section-badge">COLLECTION</div>
      <h2>FLOWER & MERCH</h2>
      <div class="products-grid">
        <a href="#/flower" class="product-card">
          <div class="product-card__image-container">
            <img src="/assets/kamikaze-box.png" alt="Flower Box">
          </div>
          <h3>FLOWER SHOWCASE</h3>
          <span class="product-card__link">VIEW CATALOGUE →</span>
        </a>
        <a href="#/merch" class="product-card">
          <div class="product-card__image-container">
            <img src="/assets/merch-hero.png" alt="Merch" style="object-fit: cover; width: 100%; height: 100%;">
          </div>
          <h3>OFFICIAL MERCH</h3>
          <span class="product-card__link">SHOP THE DROP →</span>
        </a>
        <a href="#/store-locator" class="product-card">
          <div class="product-card__image-container">
             <div class="product-card__icon-wrap">🌍</div>
          </div>
          <h3>LOCATE STOCKIST</h3>
          <span class="product-card__link">WORLDWIDE MAP →</span>
        </a>
      </div>
    </section>

    <section class="about-section animate-on-scroll">
      <div class="section-badge">ABOUT</div>
      <h2>JOHN DOE<span>SUPPLY CO.</span></h2>
      <p>Ghost brand. Living soil. NorCal roots. Working silently to produce the highest tier of multi-award winning cannabis genetics. No identities, just pure unmatched quality that speaks from Humboldt to the world.</p>
      <a href="#/about" class="btn btn--primary">OUR ETHOS</a>
    </section>

    <section class="world-section animate-on-scroll">
      <div class="section-badge">GLOBAL</div>
      <h2>INTERNATIONAL PRESENCE</h2>
      <div class="country-carousel" id="country-carousel">
        ${COUNTRIES.filter(c => c.image).map((c, i) => `
          <a href="#/country/${c.id}" class="country-card ${i === 0 ? 'country-card--large' : 'country-card--small'}">
            <div class="country-card__bg" style="background-image: url('${c.image}');"></div>
            <div class="country-card__overlay">
              <div class="country-card__code">${c.flag} ${c.code}</div>
              <div class="country-card__name">${c.name}</div>
              <div class="country-card__status">${c.status}</div>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}

function renderFlower() {
  return `
    <section class="strains-page">
      <div class="strains-page__header">
         <div class="section-badge section-badge--centered">GENETICS</div>
        <h1>FLOWER SHOWCASE</h1>
        <p class="strains-page__subtitle">PREMIUM LIVING SOIL CULTIVATION • CATALOGUE ONLY</p>
      </div>
      <div class="strains-grid">
        ${STRAINS.map(s => `
          <div class="strain-card highlight-glow" data-strain="${s.id}">
            <div class="strain-card__image">
              <img src="${s.image}" alt="${s.name}">
              <div class="strain-card__hover-overlay">
                 <span>VIEW DETAILS</span>
              </div>
            </div>
            <div class="strain-card__info">
              <div class="strain-card__name">${s.name}</div>
              <div class="strain-card__lineage">${s.lineage}</div>
              <div class="strain-card__stats">
                <span>THC: ${s.thc}</span>
                <span>Type: Flower</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="strains-disclaimer">
         <p>ALL FLOWERS ARE PRODUCED IN LIVING SOIL. PURCHASING IS ONLY AVAILABLE THROUGH AUTHORIZED DISTRIBUTORS LISTED IN OUR STORE LOCATOR.</p>
         <a href="#/store-locator" class="btn btn--secondary">FIND A STOCKIST</a>
      </div>
    </section>
  `;
}

function renderStoreLocator() {
  return `
    <section class="locator-page">
      <div class="section-badge section-badge--centered">LOGISTICS</div>
      <h1>WORLDWIDE REACH</h1>
      <div class="world-map-container" id="world-map-container">
        <div id="map-tooltip" class="map-tooltip">
          <div class="map-tooltip__name" id="tooltip-name"></div>
          <div class="map-tooltip__status" id="tooltip-status"></div>
        </div>
        ${renderWorldMapSVG()}
      </div>
      <div class="map-legend">
        <div class="map-legend__item">
          <div class="map-legend__dot map-legend__dot--active"></div>
          <span>ACTIVE REGION</span>
        </div>
        <div class="map-legend__item">
          <div class="map-legend__dot map-legend__dot--coming"></div>
          <span>COMING SOON</span>
        </div>
      </div>
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="about-page">
      <div class="about-page__hero animate-on-scroll">
        <div class="section-badge section-badge--centered">NORCAL</div>
        <h1>THE GHOST BRAND</h1>
        <p class="about-page__hero-sub">NO IDENTITY. PURE QUALITY.</p>
      </div>

      <div class="about-grid animate-on-scroll">
        <div class="about-block">
          <h2>THE ETHOS</h2>
          <p>John Doe Supply Co. was born out of a refusal to participate in the over-marketed surface level cannabis industry. We operating in the shadows, letting the output from our Humboldt gardens speak for itself.</p>
        </div>
        <div class="about-block">
          <h2>LIVING SOIL</h2>
          <p>We cultivate exclusively in high-biological living soil. By nurturing the soil food web, we allow our genetics to reach their full terpene potential. The flavor, the ash, and the experience are unmatched.</p>
        </div>
        <div class="about-block">
          <h2>GLOBAL IMPACT</h2>
          <p>From Thailand to Canada, and across Europe into Ireland and the UK — the ghost brand is recognized by those who value quality above branding. We are for the real ones.</p>
        </div>
      </div>
    </section>
  `;
}

function renderGallery() {
  return `
    <section class="gallery-page">
      <div class="section-badge section-badge--centered">VISUALS</div>
      <h1>CULTIVATION DIARIES</h1>
      <div class="gallery-grid">
        ${GALLERY_ITEMS.map((g, i) => `
          <div class="gallery-item animate-on-scroll" style="animation-delay: ${i * 0.05}s">
            <img src="${g.image}" alt="${g.title}" class="gallery-item__img">
            <div class="gallery-item__overlay">
              <span>${g.title}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderContact() {
  return `
    <section class="contact-page">
      <div class="contact-page__inner animate-on-scroll">
        <div class="section-badge">INQUIRIES</div>
        <h1>TRANSMISSION</h1>
        <form class="contact-form" id="contact-form">
          <div class="form-row">
            <input type="text" placeholder="GHOST NAME" required />
            <input type="email" placeholder="EMAIL ADDRESS" required />
          </div>
          <textarea placeholder="YOUR MESSAGE FOR THE CREW"></textarea>
          <button type="submit" class="btn btn--primary">SEND SIGNAL</button>
        </form>
      </div>
    </section>
  `;
}

function renderMerch() {
  return `
    <section class="merch-page">
      <div class="merch-page__header animate-on-scroll">
        <div class="section-badge section-badge--centered">THE SHOP</div>
        <h1>OFFICIAL SUPPLY</h1>
        <p class="merch-page__subtitle">LIMITED DROPS • WORLDWIDE SHIPPING</p>
      </div>
      <div class="merch-grid">
        ${MERCH_ITEMS.map((m, i) => `
          <div class="merch-card animate-on-scroll" style="animation-delay: ${i * 0.1}s">
            <div class="merch-card__image">
              <div class="merch-card__icon">${m.icon}</div>
              ${m.badge ? `<div class="merch-card__badge">${m.badge}</div>` : ''}
            </div>
            <div class="merch-card__info">
              <div class="merch-card__name">${m.name}</div>
              <div class="merch-card__price">$${m.price.toFixed(2)}</div>
              <div class="merch-card__actions">
                 <button class="btn btn--secondary add-to-cart" data-id="${m.id}">ADD TO CART</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="merch-checkout animate-on-scroll">
        <div class="checkout-status">
           <span>CART: <b class="cart-count">0</b> ITEMS</span>
           <button class="btn btn--primary">CONTINUE TO CHECKOUT</button>
        </div>
      </div>
    </section>
  `;
}

function renderCountry(countryId) {
  const country = COUNTRIES.find(c => c.id === countryId);
  if (!country) return '<h1>Not Found</h1>';
  return `
    <section class="country-page">
      <div class="country-page__hero">
         <div class="section-badge section-badge--centered">${country.id.toUpperCase()}</div>
        <h1>${country.name.toUpperCase()}</h1>
      </div>
      <div class="country-page__content animate-on-scroll">
        <div class="country-detail-grid">
           <div class="country-detail-text">
              <h2>LOCAL STATUS: ${country.status.toUpperCase()}</h2>
              <p>${country.desc}</p>
              <div style="margin-top: 30px;">
                  <a href="#/contact" class="btn btn--primary">BECOME A DISTRIBUTOR</a>
              </div>
           </div>
           <div class="country-detail-visual">
              <div class="country-flag-glow text-center" style="font-size: 8rem;">${country.flag}</div>
           </div>
        </div>
      </div>
    </section>
  `;
}

// --- Simplified World Map SVG Paths ---
function renderWorldMapSVG() {
  return `
    <div class="world-map-wrapper">
      <div class="world-map-bg"></div>
      <svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" id="world-map">
        <!-- Overlay for interactive regions (invisible paths for hit zones) -->
        <path class="country-active" data-country="usa" d="M 120 100 L 300 100 L 300 220 L 120 220 Z" opacity="0" />
        <path class="country-active" data-country="canada" d="M 120 40 L 330 40 L 330 100 L 120 100 Z" opacity="0" />
        <path class="country-active" data-country="thailand" d="M 720 200 L 780 200 L 780 280 L 720 280 Z" opacity="0" />
        
        <!-- European Cluster Hit Zones -->
        <path class="country-active" data-country="france" d="M 470 110 L 500 110 L 500 140 L 470 140 Z" opacity="0" />
        <path class="country-active" data-country="germany" d="M 500 90 L 530 90 L 530 130 L 500 130 Z" opacity="0" />
        <path class="country-active" data-country="italy" d="M 500 140 L 540 140 L 540 190 L 500 190 Z" opacity="0" />
        <path class="country-active" data-country="switzerland" d="M 500 130 L 520 130 L 520 145 L 500 145 Z" opacity="0" />
        <path class="country-active" data-country="holland" d="M 495 100 L 510 100 L 510 115 L 495 115 Z" opacity="0" />

        <!-- Gold Pulsing Locators -->
        <g class="map-pulses">
          <circle cx="230" cy="160" r="6" fill="var(--color-gold)" class="pulse-dot">
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="220" cy="80" r="5" fill="var(--color-gold)" class="pulse-dot">
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="485" cy="125" r="4" fill="var(--color-gold)" class="pulse-dot">
            <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="510" cy="110" r="4" fill="var(--color-gold)" class="pulse-dot">
            <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="745" cy="240" r="5" fill="var(--color-gold)" class="pulse-dot">
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  `;
}

// --- Helpers & UI Logic ---
function getCountryGradient(index) {
  const gs = ['#2a3020', '#1a2a2a', '#3a3020', '#1a3a1a', '#2a2a3a', '#3a2a1a'];
  return `linear-gradient(135deg, ${gs[index % gs.length]}, #0a0a0a)`;
}

function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  if (!slides.length) return;
  function goTo(n) {
    heroSlide = n;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[n]?.classList.add('active');
    dots[n]?.classList.add('active');
  }
  dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.dot))));
  heroInterval = setInterval(() => goTo((heroSlide + 1) % 3), 5000);
}

function initCountryCarousel() {
  const cards = document.querySelectorAll('.country-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cards.forEach(c => { c.classList.remove('country-card--large'); c.classList.add('country-card--small'); });
      card.classList.remove('country-card--small'); card.classList.add('country-card--large');
    });
  });
}

function initWorldMap() {
  const container = document.getElementById('world-map-container');
  const tooltip = document.getElementById('map-tooltip');
  if (!container) return;
  container.querySelectorAll('.country-active').forEach(path => {
    const cid = path.dataset.country;
    const country = COUNTRIES.find(c => c.id === cid);
    if (!country) return;
    path.addEventListener('mouseenter', () => {
      document.getElementById('tooltip-name').textContent = country.name;
      document.getElementById('tooltip-status').textContent = country.status;
      tooltip.classList.add('visible');
    });
    path.addEventListener('mousemove', (e) => {
      const r = container.getBoundingClientRect();
      tooltip.style.left = (e.clientX - r.left + 15) + 'px';
      tooltip.style.top = (e.clientY - r.top - 10) + 'px';
    });
    path.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
    path.addEventListener('click', () => window.location.hash = `#/country/${cid}`);
  });
}

function initMerchListeners() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
  updateCartUI();
}

function initScrollAnimations() {
  const obs = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));
}

function initAgeGate() {
  const gate = document.getElementById('age-gate');
  const yes = document.getElementById('age-yes');
  if (localStorage.getItem('jdsc-v')) { gate.style.display = 'none'; return; }
  yes?.addEventListener('click', () => {
    localStorage.setItem('jdsc-v', '1');
    gate.style.opacity = '0';
    setTimeout(() => gate.style.display = 'none', 500);
  });
}

function initNav() {
  const t = document.getElementById('nav-toggle');
  const n = document.getElementById('main-nav');
  const c = document.getElementById('nav-close');
  t?.addEventListener('click', () => n.classList.add('open'));
  c?.addEventListener('click', () => n.classList.remove('open'));
  n?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => n.classList.remove('open')));
}

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', () => {
  initAgeGate();
  initNav();
  router();
});
