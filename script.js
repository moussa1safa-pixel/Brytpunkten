// ===== MOBILMENY =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Förhindra scroll när meny är öppen på mobil
        if (window.innerWidth <= 768) {
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        }
    });

    // Stäng menyn när man klickar på en länk
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== HEADER SCROLL-EFFEKT - ENDAST FÖR INDEX-SIDAN =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    // Kolla om vi är på medlemssidan (har member-nav klassen)
    const isMemberPage = navbar && navbar.classList.contains('member-nav');
    
    if (navbar && !isMemberPage) {
        // Bara ändra header på index-sidan (inte medlemssidan)
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }
    }
    
    // På medlemssidan (member-nav) - header förblir alltid vit
    if (navbar && isMemberPage) {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
    }
});

// ===== UPPDATERA COPYRIGHT-ÅR =====
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ===== SMOOTH SCROLL - FUNGERAR PÅ ALLA SIDOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId.startsWith('http')) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            // Stäng mobilmeny om den är öppen
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            
            // Beräkna offset baserat på header
            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight : 80;
            
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORMULÄR-HANTERING FÖR MEDLEMSSIDAN =====
document.addEventListener('DOMContentLoaded', function() {
    const medlemForm = document.getElementById('medlemsansokan');
    
    if (medlemForm) {
        // Återställ formulär-state vid sidladdning (fixar "Skickar..." bugg)
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Skicka ansökan';
        }
        
        if (formMessage) {
            formMessage.style.display = 'none';
        }
        
        // Kolla om vi kom tillbaka från Formspree med success
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('success')) {
            // Visa tack-meddelande
            if (formMessage) {
                formMessage.textContent = 'Tack för din ansökan! Vi kommer att kontakta dig inom några arbetsdagar.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // Scrolla till meddelandet
                setTimeout(() => {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
            }
        }
    }
});

// ===== LADDA SIDAN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Brytpunkten - Sidan är redo!');
});
