// Partikelkonfiguration för hero-sektionen
document.addEventListener('DOMContentLoaded', function() {
    // Initiera partiklar om elementet finns
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80, // Antal partiklar
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff" // Vita partiklar
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.3, // Genomskinliga
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 2, // Små prickar
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false // Ingen linje mellan partiklar
                },
                "move": {
                    "enable": true,
                    "speed": 0.7, // Långsam, elegant rörelse
                    "direction": "top", // Rörelse uppåt
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse" // Partiklarna flyttar sig bort från muspekaren
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": true
                }
            },
            "retina_detect": true
        });
    }

    // Uppdatera copyright-året automatiskt
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
