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
    // ===== UPPDATERA COPYRIGHT-ÅR =====
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== FÖRBÄTTRAD VALIDERING AV FÖDELSEDATUM =====
    function isValidBirthdate(value) {
        if (!/^\d{6}$/.test(value)) return false;
        
        const year = parseInt(value.substr(0, 2));
        const month = parseInt(value.substr(2, 2));
        const day = parseInt(value.substr(4, 2));
        
        // Grundläggande validering
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;
        
        // Kolla specifika månaders dagar
        const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (day > daysInMonth[month - 1]) return false;
        
        // Om februari och 29:e, kontrollera skottår (enkel version)
        if (month === 2 && day === 29) {
            const fullYear = year > 50 ? 1900 + year : 2000 + year;
            if (fullYear % 4 !== 0) return false;
        }
        
        return true;
    }
    
    // ===== FORMULÄRHANTERING =====
    const medlemForm = document.getElementById('medlemsansokan');
    
    if (medlemForm) {
        // Variabel för att förhindra spam-klick
        let isSubmitting = false;
        let lastSubmitTime = 0;
        
        // FIXA BLÅ AUTOFILL-FÄRG
        const inputs = medlemForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.backgroundColor = 'white';
                this.style.boxShadow = 'none';
            });
            
            // Validera födelsedatum i realtid
            if (input.name === 'Födelsedatum') {
                input.addEventListener('blur', function() {
                    if (this.value.trim() && !isValidBirthdate(this.value.trim())) {
                        this.style.borderColor = '#C62828';
                        this.style.boxShadow = '0 0 0 2px rgba(198, 40, 40, 0.1)';
                    } else {
                        this.style.borderColor = '';
                        this.style.boxShadow = '';
                    }
                });
            }
        });
        
        // FORMULÄRSKICKNING MED SPAM-SKYDD
        medlemForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('formMessage');
            
            if (!submitBtn || !formMessage) return;
            
            // SPAM-SKYDD 1: Förhindra dubbla klick
            if (isSubmitting) {
                formMessage.textContent = 'Vänligen vänta, din ansökan skickas...';
                formMessage.className = 'form-message loading';
                formMessage.style.display = 'block';
                return false;
            }
            
            // SPAM-SKYDD 2: Förhindra för snabba inlämningar
            const now = Date.now();
            if (now - lastSubmitTime < 5000) { // 5 sekunders timeout
                formMessage.textContent = 'Vänligen vänta 5 sekunder mellan ansökningar.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return false;
            }
            
            // Validering av födelsedatum
            const birthInput = this.querySelector('input[name="Födelsedatum"]');
            if (birthInput && birthInput.value) {
                const birthValue = birthInput.value.trim();
                if (!isValidBirthdate(birthValue)) {
                    formMessage.textContent = 'Ange ett giltigt födelsedatum med 6 siffror: ÅÅMMDD';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                    birthInput.focus();
                    return false;
                }
            }
            
            // Validering av samtycken
            const consent1 = this.querySelector('input[name="Samtycke_integritet"]');
            const consent2 = this.querySelector('input[name="Samtycke_spara_uppgifter"]');
            
            if (!consent1?.checked || !consent2?.checked) {
                formMessage.textContent = 'Du måste godkänna båda samtyckena.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return false;
            }
            
            // Sätt spam-skydd
            isSubmitting = true;
            lastSubmitTime = now;
            
            // Visa loading
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Skickar... <span style="font-size:0.9em">⏳</span>';
            formMessage.textContent = 'Skickar din ansökan, vänligen vänta...';
            formMessage.className = 'form-message loading';
            formMessage.style.display = 'block';
            
            try {
                // SPAM-SKYDD 3: Lägg till timestamp och sidans URL
                const formData = new FormData(this);
                formData.append('_timestamp', now.toString());
                formData.append('_source', window.location.href);
                formData.append('_useragent', navigator.userAgent.substring(0, 100));
                
                // Skicka med fetch
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // SUCCESS - DITT VAL: "Tack för din ansökan! Vi behandlar den snarast."
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    formMessage.textContent = 'Tack för din ansökan! Vi behandlar den snarast.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    
                    // Scrolla till meddelandet
                    setTimeout(() => {
                        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                    
                    // Rensa formuläret efter 3 sekunder (valfritt)
                    setTimeout(() => {
                        // this.reset(); // Aktivera om du vill rensa formuläret
                        isSubmitting = false;
                    }, 3000);
                    
                } else {
                    // ERROR från server
                    throw new Error('Serverfel: ' + response.status);
                }
                
            } catch (error) {
                // ERROR - Visa felmeddelande
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                isSubmitting = false;
                
                formMessage.textContent = 'Ett fel uppstod. Vänligen försök igen eller kontakta oss direkt.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                
                console.error('Formulär fel:', error);
            }
        });
        
        // Reset spam-skydd vid formulärrensning
        medlemForm.addEventListener('reset', () => {
            isSubmitting = false;
        });
    }
    
    // ===== CONSOLE LOG FÖR DEBUGGING =====
    console.log('Brytpunkten - Sidan är redo!');
});
