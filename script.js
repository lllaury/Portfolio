const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 60) * (canvas.width / 60)
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Dot {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.originalColor = color;
        this.color = color;
    }

    draw() {
        let distanceToMouse = Math.sqrt((this.x - mouse.x) ** 2 + (this.y - mouse.y) ** 2);
        let opacity = Math.max(0, 1 - distanceToMouse / (mouse.radius * 2));

        if (distanceToMouse / mouse.radius < 1) opacity = Math.max(0, (1 - distanceToMouse / mouse.radius) / 1.5);

        opacity = Math.min(.5, opacity);
        this.color = this.originalColor.replace(/0.7\)$/, `${opacity})`);

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
    for (let i = 0; i < 200; i++) {
        let radius = 2;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
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

    connect();
}

// This can be sped up
function connect() {
    const dotsInRadius = dots.filter(curr => {
        let dx = mouse.x - curr.x;
        let dy = mouse.y - curr.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        return distance < mouse.radius;
    });

    for (let i = 0; i < dotsInRadius.length; i++) {
        for (let j = i; j < dotsInRadius.length; j++) {
            let distance = ((dotsInRadius[i].x - dotsInRadius[j].x) * (dotsInRadius[i].x 
                - dotsInRadius[j].x)) + ((dotsInRadius[i].y - dotsInRadius[j].y) * (dotsInRadius[i].y - dotsInRadius[j].y));

            if (distance < (mouse.radius / 4) ** 2) {
                ctx.strokeStyle = dotsInRadius[i].color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(dotsInRadius[i].x, dotsInRadius[i].y);
                ctx.lineTo(dotsInRadius[j].x, dotsInRadius[j].y);
                ctx.stroke();
            }
        }
    }
}

init();
animate();

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 60) * (canvas.height / 60));
    init();
});
