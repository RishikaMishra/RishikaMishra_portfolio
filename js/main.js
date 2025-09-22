// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Typewriter effect
const typewriter = document.querySelector('.typewriter');
const phrases = ['Software Engineer', 'QA Engineer', 'Full-Stack Developer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

// Start typewriter effect
type();

// Scroll reveal animations
const revealElements = document.querySelectorAll('.section-title, .skill-item, .timeline-item, .project-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
        // Add your form submission logic here
        console.log('Form submitted:', data);
        contactForm.reset();
        alert('Message sent successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    }
});

// Skills animation
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.1)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});
