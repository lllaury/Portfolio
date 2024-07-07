document.addEventListener('DOMContentLoaded', function() {

    // Particle animation
    const sectionsContainer = document.getElementById('sections-container');
    const canvas = document.createElement('canvas');
    sectionsContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = sectionsContainer.offsetWidth;
        canvas.height = sectionsContainer.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let dots = [];

    class Dot {
        constructor(x, y, dx, dy, radius, color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.dx = -this.dx;
            }

            if (this.y > canvas.height || this.y < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    function getRandomBlueShade() {
        const shades = ['rgba(83, 87, 99, 0.7)', 'rgba(49, 69, 112, 0.7)', 'rgba(49, 69, 112, 0.7)',
         'rgba(63, 112, 140, 0.7)', 'rgba(33, 122, 173, 0.7)', 'rgba(49, 117, 108, 0.7)'];
        return shades[Math.floor(Math.random() * shades.length)];
    }

    function init() {
        dots = [];
        for (let i = 0; i < 50; i++) { // Reduced the number of particles for a sparser effect
            let radius = Math.random() * 2;
            let x = Math.random() * (canvas.width - radius * 2) + radius;
            let y = Math.random() * (canvas.height - radius * 2) + radius;
            let dx = (Math.random() - 0.5) * .5;
            let dy = (Math.random() - 0.5) * .5;
            let color = getRandomBlueShade();
            dots.push(new Dot(x, y, dx, dy, radius, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < dots.length; i++) {
            dots[i].update();
        }
    }

    init();
    animate();
});
