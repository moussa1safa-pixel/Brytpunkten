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

// ===== GENOMSKINLIG HEADER SCROLL-EFFEKT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Lägg till 'scrolled' klass när man scrollar ner
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }
    }
});

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
            
            // Beräkna offset
            const offset = window.innerWidth <= 768 ? 70 : 80;
            
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// ===== LADDA SIDAN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Brytpunkten - Sidan är redo!');
});
