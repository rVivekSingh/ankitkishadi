document.addEventListener('DOMContentLoaded', function() {
    var giftButton = document.getElementById('giftButton');
    var giftPopup = document.getElementById('giftPopup');
    var close = document.getElementsByClassName('close')[0];
    var photo = document.getElementById('photo');
    var canvas = document.getElementById('fireworksCanvas');
    var ctx = canvas.getContext('2d');
    var backgroundMusic = document.getElementById('backgroundMusic');
    var playMusicButton = document.getElementById('playMusicButton');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createFirework(x, y, color) {
        var particles = [];
        var particleCount = 100;
        var angleIncrement = (Math.PI * 2) / particleCount;

        for (var i = 0; i < particleCount; i++) {
            particles.push({
                x: x,
                y: y,
                angle: angleIncrement * i,
                speed: Math.random() * 5 + 2,
                radius: Math.random() * 2 + 1,
                alpha: 1,
                decay: Math.random() * 0.02 + 0.01,
                color: color
            });
        }

        return particles;
    }

    function drawFireworks(particles) {
        particles.forEach(function(particle, index) {
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
            particle.alpha -= particle.decay;

            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
                ctx.fill();
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(function() {
                drawFireworks(particles);
            });
        }
    }

    function triggerFireworks(x, y) {
        var colors = [
            '255, 0, 0',       // Red
            '255, 255, 0',     // Yellow
            '0, 255, 0',       // Green
            '0, 0, 255',       // Blue
            '255, 165, 0',     // Orange
            '75, 0, 130',      // Indigo
            '238, 130, 238',   // Violet
            '255, 105, 180',   // Hot Pink
            '255, 69, 0',      // Red-Orange
            '173, 255, 47',    // Green-Yellow
            '0, 255, 255',     // Cyan
            '255, 20, 147',    // Deep Pink
            '255, 140, 0',     // Dark Orange
            '0, 191, 255',     // Deep Sky Blue
            '148, 0, 211'      // Dark Violet
        ];
        var color = colors[Math.floor(Math.random() * colors.length)];
        var particles = createFirework(x, y, color);
        drawFireworks(particles);
    }

    function loopFireworks() {
        triggerFireworks(0, canvas.height / 2); // Left side
        triggerFireworks(canvas.width, canvas.height / 2); // Right side
        triggerFireworks(canvas.width/2 , canvas.height); // Behind the image
        triggerFireworks(canvas.width / 2, canvas.height / 2); // Behind the image
        setTimeout(loopFireworks, 2000); // Adjust the interval as needed
    }

    photo.onload = function() {
        triggerFireworks(canvas.width / 2, canvas.height / 2);
        loopFireworks();
    }

    giftButton.onclick = function() {
        giftPopup.classList.remove('hidden');
        triggerFireworks(canvas.width / 2, canvas.height / 2);
    }

    close.onclick = function() {
        giftPopup.classList.add('hidden');
    }

    window.onclick = function(event) {
        if (event.target == giftPopup) {
            giftPopup.classList.add('hidden');
        }
    }

    // Start the loop immediately
    loopFireworks();

    // Play background music on button click
    playMusicButton.onclick = function() {
        backgroundMusic.play();
        playMusicButton.classList.add('hidden');
    };
});
