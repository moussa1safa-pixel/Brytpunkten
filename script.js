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

// ===== FORMULÄR-HANTERING FÖR MEDLEMSSIDAN (NY!) =====
document.addEventListener('DOMContentLoaded', function() {
    const medlemForm = document.getElementById('medlemsansokan');
    
    if (medlemForm) {
        // FIXA BLÅ AUTOFILL-FÄRG
        const inputs = medlemForm.querySelectorAll('input');
        inputs.forEach(input => {
            // Återställ vid fokus
            input.addEventListener('focus', function() {
                this.style.backgroundColor = 'white';
                this.style.boxShadow = 'none';
            });
        });
        
        // FORMULÄRSKICKNING MED FETCH (STANNAR PÅ SIDAN)
        medlemForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('formMessage');
            
            if (!submitBtn || !formMessage) return;
            
            // Validering
            const birthInput = this.querySelector('input[name="Födelsedatum"]');
            if (birthInput && birthInput.value) {
                const birthValue = birthInput.value.trim();
                if (birthValue.length !== 6 || !/^\d{6}$/.test(birthValue)) {
                    formMessage.textContent = 'Ange födelsedatum som 6 siffror: ÅÅMMDD';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                    birthInput.focus();
                    return false;
                }
            }
            
            // Visa loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Skickar... <span style="font-size:0.9em">⏳</span>';
            formMessage.textContent = 'Skickar din ansökan, vänligen vänta...';
            formMessage.className = 'form-message loading';
            formMessage.style.display = 'block';
            
            try {
                // Skicka med fetch
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // SUCCESS - Visa tack-meddelande
                    submitBtn.innerHTML = 'Skicka ansökan';
                    submitBtn.disabled = false;
                    
                    formMessage.textContent = 'Tack för din ansökan! Vi kommer att kontakta dig inom några arbetsdagar.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    
                    // Scrolla till meddelandet
                    setTimeout(() => {
                        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                    
                    // Rensa formuläret (valfritt)
                    // this.reset();
                    
                } else {
                    // ERROR
                    throw new Error('Formuläret kunde inte skickas');
                }
                
            } catch (error) {
                // ERROR - Visa felmeddelande
                submitBtn.innerHTML = 'Skicka ansökan';
                submitBtn.disabled = false;
                
                formMessage.textContent = 'Ett fel uppstod. Vänligen försök igen eller kontakta oss direkt.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                console.error('Formulär fel:', error);
            }
        });
    }
});

// ===== LADDA SIDAN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Brytpunkten - Sidan är redo!');
});
