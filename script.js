// Partikelkonfiguration - SVARTA partiklar på VIT bakgrund
document.addEventListener('DOMContentLoaded', function() {
    // Initiera partiklar
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40,  // Färre partiklar, större effekt
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#1a1a1a"  // SVARTA partiklar
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 6,  // STÖRRE (var 2 innan)
                    random: true,
                    anim: {
                        enable: true,
                        speed: 3,
                        size_min: 1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1,  // Långsammare rörelse
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    
    // Uppdatera copyright-året
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Ladda om partiklar vid fönsterstorleksändring
    window.addEventListener('resize', function() {
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            pJSDom[0].pJS.fn.vendors.destroypJS();
            pJSDom.splice(0, 1);
            if (document.getElementById('particles-js')) {
                particlesJS('particles-js', pJSDom[0].pJS.config);
            }
        }
    });
});
