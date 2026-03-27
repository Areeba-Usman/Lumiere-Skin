window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('page-transition').classList.add('done');
    }, 200);
});

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    setTimeout(() => {
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
    }, 60);
});
document.querySelectorAll('a, button, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.width = '56px'; ring.style.height = '56px'; ring.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '0.5';
    });
});

window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('open');
}
function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
}

const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left').forEach(el => obs.observe(el));

const ingredients = {
    serum: {
        tag: 'Bestseller',
        name: 'Dewy Glow Serum',
        list: [
            { icon: '💧', name: 'Hyaluronic Acid', desc: 'Pulls moisture from the air into your skin. Keeps it plump and hydrated for hours without feeling heavy.' },
            { icon: '🌹', name: 'Rosehip Oil', desc: 'Packed with vitamin C and essential fatty acids. Fades dark spots, evens tone, and gives that natural glow.' },
            { icon: '🌿', name: 'Niacinamide (5%)', desc: 'Minimizes pores, controls oil, and calms redness. One of the most well-researched ingredients in skincare.' },
            { icon: '🍯', name: 'Squalane', desc: "Lightweight plant-derived oil that mimics your skin's natural sebum. Seals everything in without clogging pores." }
        ],
        note: '"I use this every single morning, under SPF. Within two weeks, three people asked me if I was glowing — I was."'
    },
    cleanser: {
        tag: 'For Sensitive Skin',
        name: 'Calm & Clean Cleanser',
        list: [
            { icon: '🌾', name: 'Oat Extract', desc: 'Soothes irritation and reduces redness. Perfect for reactive or sensitive skin that gets angry at everything.' },
            { icon: '🫧', name: 'Gentle Surfactants', desc: 'Clean without stripping. Your skin barrier stays intact — no tight, squeaky feeling after washing.' },
            { icon: '🌸', name: 'Allantoin', desc: 'Heals and softens skin while you cleanse. Derived from comfrey plant — gentle and effective.' },
            { icon: '💦', name: 'Glycerin', desc: 'Humectant that keeps skin hydrated even after rinsing. Leaves behind softness, not dryness.' }
        ],
        note: '"I designed this for days when my skin is just... done. Stressed, red, flaky. This cleanser never makes things worse — it only makes them better."'
    },
    cream: {
        tag: 'Night Ritual',
        name: 'Overnight Repair Cream',
        list: [
            { icon: '🧈', name: 'Shea Butter', desc: 'Rich, nourishing, and full of vitamins A and E. Deeply repairs the skin barrier while you sleep.' },
            { icon: '🔬', name: 'Ceramides (3 types)', desc: 'The building blocks of your skin barrier. Replenishes what daily life strips away — pollution, stress, screens.' },
            { icon: '🌙', name: 'Bakuchiol', desc: 'Natural alternative to retinol. Same cell-turnover benefits, zero irritation. Great even for sensitive skin.' },
            { icon: '🫚', name: 'Jojoba Oil', desc: "Technically a wax — perfectly mimics the skin's natural oil. Balancing, soothing, and non-comedogenic." }
        ],
        note: '"I put this on right before bed and wake up with the softest skin. It\'s become the one step I never skip."'
    }
};

function openPopup(product) {
    const data = ingredients[product];
    document.getElementById('popupTag').textContent = data.tag;
    document.getElementById('popupName').textContent = data.name;
    document.getElementById('popupNote').textContent = data.note;
    const list = document.getElementById('ingList');
    list.innerHTML = data.list.map(i => `
        <div class="ing-item">
          <div class="ing-icon">${i.icon}</div>
          <div>
            <div class="ing-name">${i.name}</div>
            <div class="ing-desc-text">${i.desc}</div>
          </div>
        </div>
      `).join('');
    document.getElementById('popupOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    document.getElementById('popupOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function closePopupOutside(e) {
    if (e.target === document.getElementById('popupOverlay')) closePopup();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });
