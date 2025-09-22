// Dark Mode Toggle
const themeSwitch = document.createElement('div');
themeSwitch.className = 'theme-switch';
themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeSwitch);

themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeSwitch.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Scroll Progress Bar
const progressContainer = document.createElement('div');
progressContainer.className = 'progress-container';
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
progressContainer.appendChild(progressBar);
document.body.appendChild(progressContainer);

window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalScroll) * 100;
    progressBar.style.width = `${progress}%`;
});

// Custom Cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursor);
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
});

// Enhanced Skill Animations
const skillItems = document.querySelectorAll('.skill-item');
const observerOptions = {
    threshold: 0.5
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

skillItems.forEach(item => {
    skillObserver.observe(item);
    
    // Add percentage indicator
    const percentage = Math.floor(Math.random() * 30) + 70; // Random percentage between 70-100
    const percentageEl = document.createElement('span');
    percentageEl.className = 'skill-percentage';
    percentageEl.textContent = `${percentage}%`;
    item.appendChild(percentageEl);
});

// Project Card Flip
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// Enhanced Contact Form
const contactForm = document.getElementById('contact-form');
const loadingSpinner = document.createElement('div');
loadingSpinner.className = 'loading';
contactForm.appendChild(loadingSpinner);

const showAlert = (type, message) => {
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;
    contactForm.insertBefore(alert, contactForm.firstChild);
    setTimeout(() => alert.remove(), 5000);
};

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loadingSpinner.style.display = 'block';
    
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        showAlert('success', 'Message sent successfully!');
        contactForm.reset();
    } catch (error) {
        showAlert('error', 'Failed to send message. Please try again.');
    } finally {
        loadingSpinner.style.display = 'none';
    }
});

// Scroll To Top Button
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Particle Background for Hero Section
const createParticleBackground = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    
    const hero = document.querySelector('.hero');
    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const resizeCanvas = () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
            this.radius = Math.random() * 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(37, 99, 235, 0.1)';
            ctx.fill();
        }
    }
    
    const createParticles = () => {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    };
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    };
    
    createParticles();
    animate();
};

createParticleBackground();
