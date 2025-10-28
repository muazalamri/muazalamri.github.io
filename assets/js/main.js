document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initSmoothScroll();
    initParallax();
    initOscilloscopeCursor();
});

function initLoader() {
    const loader = document.getElementById('loader');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const loaderStatus = document.querySelector('.loader-status');
    
    const statuses = [
        'Initializing PCB circuits...',
        'Loading embedded systems...',
        'Connecting neural networks...',
        'Calibrating sensors...',
        'System ready!'
    ];
    
    let progress = 0;
    let statusIndex = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
        
        const newStatusIndex = Math.floor((progress / 100) * statuses.length);
        if (newStatusIndex !== statusIndex && newStatusIndex < statuses.length) {
            statusIndex = newStatusIndex;
            loaderStatus.textContent = statuses[statusIndex];
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 800);
        }
    }, 200);
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const pcbPattern = document.querySelector('.pcb-pattern');
            const circuitTraces = document.querySelector('.circuit-traces');
            
            if (pcbPattern) {
                pcbPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            if (circuitTraces) {
                circuitTraces.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.05}deg)`;
            }
        });
    }
}

window.addEventListener('mousemove', (e) => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 153, 0.3) 0%, transparent 50%)`;
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .tool-item, .custom-tool-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

function initOscilloscopeCursor() {
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-trail';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const trail = [];
    const maxTrailLength = 15;
    let mouseX = 0;
    let mouseY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.push({ x: mouseX, y: mouseY, opacity: 1 });
        if (trail.length > maxTrailLength) {
            trail.shift();
        }
    });
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        trail.forEach((point, index) => {
            const progress = index / trail.length;
            ctx.strokeStyle = `rgba(0, 255, 153, ${progress * 0.3})`;
            ctx.lineWidth = 2;
            
            if (index > 0) {
                ctx.beginPath();
                ctx.moveTo(trail[index - 1].x, trail[index - 1].y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
        });
        
        if (mouseX && mouseY) {
            ctx.strokeStyle = '#00FF99';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(mouseX - 10, mouseY);
            ctx.lineTo(mouseX + 10, mouseY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY - 10);
            ctx.lineTo(mouseX, mouseY + 10);
            ctx.stroke();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}
