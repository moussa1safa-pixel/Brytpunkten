// Enkel JavaScript för sidan
document.addEventListener('DOMContentLoaded', function() {
    // Uppdatera copyright-året
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Animation för bollen som bryts (enklare version - startar direkt)
    const animationElements = {
        ball: document.querySelector('.ball'),
        cracks: document.querySelectorAll('.crack'),
        pieces: document.querySelectorAll('.piece'),
        logo: document.querySelector('.logo-emerge')
    };
    
    // Starta animationen när sidan laddat
    setTimeout(() => {
        if (animationElements.ball) {
            // Visa sprickor
            animationElements.cracks.forEach(crack => {
                crack.style.opacity = '1';
            });
            
            // Flytta bitarna isär
            setTimeout(() => {
                if (animationElements.pieces[0]) {
                    animationElements.pieces[0].style.transform = 'translateX(-30px) rotate(-15deg)';
                    animationElements.pieces[1].style.transform = 'translateX(30px) rotate(15deg)';
                }
                
                // Visa loggan
                setTimeout(() => {
                    if (animationElements.logo) {
                        animationElements.logo.style.opacity = '1';
                        animationElements.logo.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            animationElements.logo.style.transform = 'scale(1)';
                        }, 300);
                    }
                }, 500);
            }, 500);
        }
    }, 1000);
    
    // Smooth scroll för länkar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
