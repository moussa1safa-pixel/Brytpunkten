// ===== HERO BILD LÖSNING =====
function loadHeroImage() {
    const heroContainer = document.getElementById('heroContainer');
    const isMobile = window.innerWidth <= 768;
    
    // Rensa containern
    heroContainer.innerHTML = '';
    
    if (isMobile) {
        // Mobil - visa hero-mobile.jpg med cover
        const img = document.createElement('img');
        img.src = 'hero-mobile.jpg?v=' + Date.now(); // Lägg till timestamp för att undvika cache
        img.alt = 'Brytpunkten';
        img.className = 'hero-mobile-img';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.objectPosition = 'center 25%';
        
        heroContainer.appendChild(img);
        heroContainer.style.height = '85vh';
        heroContainer.style.minHeight = '500px';
        heroContainer.style.position = 'relative';
        heroContainer.style.overflow = 'hidden';
    } else {
        // Dator - visa hero-desktop.jpg med contain
        heroContainer.style.backgroundImage = 'url("hero-desktop.jpg?v=' + Date.now() + '")';
        heroContainer.style.backgroundSize = 'contain';
        heroContainer.style.backgroundPosition = 'center center';
        heroContainer.style.backgroundRepeat = 'no-repeat';
        heroContainer.style.backgroundColor = '#000000';
        heroContainer.style.height = '85vh';
        heroContainer.style.minHeight = '500px';
        heroContainer.style.display = 'flex';
        heroContainer.style.alignItems = 'center';
        heroContainer.style.justifyContent = 'center';
    }
}

// ===== MOBILMENY =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Stäng menyn när man klickar på en länk
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// ===== UPPDATERA COPYRIGHT-ÅR =====
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Stäng mobilmeny om den är öppen
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            
            // Beräkna offset baserat på skärmstorlek
            const offset = window.innerWidth <= 768 ? 70 : 80;
            
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SKUGGA VID SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    }
});

// ===== INITIALISERA ALLT NÄR SIDAN LADDAS =====
document.addEventListener('DOMContentLoaded', function() {
    // Ladda hero-bilden
    loadHeroImage();
    
    // Lyssna på fönsterstorleksändringar
    window.addEventListener('resize', loadHeroImage);
    
    // Debug-info
    console.log('Brytpunkten - Sidan är redo!');
    console.log('Hero-bilden laddad för:', window.innerWidth <= 768 ? 'Mobil' : 'Dator');
});

// ===== FÖRHINDRA CACHING FÖR TEST =====
if (window.location.search.indexOf('nocache') > -1) {
    console.log('Cache förhindrad för testning');
}
