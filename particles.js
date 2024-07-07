document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.cta-button');
    let intervalID = null;
    button.addEventListener('mouseover', createSparkles);
    button.addEventListener('mouseout', stopSparkles);
    
    function stopSparkles(event) {
        clearInterval(intervalID);
    }

    function createSparkles(event) {
        const container = event.currentTarget;

        intervalID = setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            container.appendChild(sparkle);
            positionSparkle(sparkle, container);
        }, 20);
    }

    function positionSparkle(sparkle, container) {
        const rect = container.getBoundingClientRect();
        const edge = Math.floor(Math.random() * 4); // 0 = top, 1 = right, 2 = bottom, 3 = left
        let x, y, translateX, translateY;

        switch (edge) {
            case 0: // top
                x = Math.random() * rect.width;
                y = 0;
                translateX = (Math.random() - 0.5) * 50;
                translateY = Math.random() * -50;
                break;
            case 1: // right
                x = rect.width;
                y = Math.random() * rect.height;
                translateX = Math.random() * 50;
                translateY = (Math.random() - 0.5) * 50;
                break;
            case 2: // bottom
                x = Math.random() * rect.width;
                y = rect.height;
                translateX = (Math.random() - 0.5) * 50;
                translateY = Math.random() * 50;
                break;
            case 3: // left
                x = 0;
                y = Math.random() * rect.height;
                translateX = Math.random() * -50;
                translateY = (Math.random() - 0.5) * 50;
                break;
        }

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.setProperty('--sparkle-x1', `${translateX / 2}px`);
        sparkle.style.setProperty('--sparkle-x2', `${translateX}px`);
        sparkle.style.setProperty('--sparkle-y1', `${translateY / 2}px`);
        sparkle.style.setProperty('--sparkle-y2', `${translateY}px`);
        
        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    }
});
