// Mobilmeny toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Stäng mobilmeny vid klick utanför
    document.addEventListener('click', closeMenuOnClickOutside);
});

// Stäng menyn när man klickar på en länk
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.removeEventListener('click', closeMenuOnClickOutside);
}));

// Funktion för att stänga meny vid klick utanför
function closeMenuOnClickOutside(event) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Uppdatera copyright-året automatiskt
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth scroll för anchor-länkar med offset för fast navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Stäng mobilmeny om den är öppen
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Beräkna offset baserat på skärmstorlek
            const offset = window.innerWidth <= 768 ? 70 : 80;
            
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Lägg till skugga på navbar vid scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Visa console-log när sidan laddas (kan tas bort senare)
console.log('Brytpunkten - Sidan är redo!');
