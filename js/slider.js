document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.project-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.project-card');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    let startX;
    let scrollLeft;
    let isDragging = false;

    // Calculate how many cards to show per view
    const cardsPerView = 3;
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(cards[0]).marginRight);
        currentIndex = index * cardsPerView;
        
        // Ensure we don't go past the last possible position
        const maxIndex = cards.length - cardsPerView;
        currentIndex = Math.min(currentIndex, maxIndex);
        
        // Calculate the offset for smooth scrolling
        const translateX = -currentIndex * cardWidth;
        slider.style.transform = `translate3d(${translateX}px, 0, 0)`;
        
        updateDots();
        updateCards();
        
        // Update button states
        prevBtn.style.opacity = index === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';
        
        const lastSlideIndex = Math.ceil(cards.length / cardsPerView) - 1;
        nextBtn.style.opacity = index === lastSlideIndex ? '0.5' : '1';
        nextBtn.style.pointerEvents = index === lastSlideIndex ? 'none' : 'auto';
    }

    // Navigation buttons
    nextBtn.addEventListener('click', () => {
        const currentSlide = Math.floor(currentIndex / cardsPerView);
        if (currentSlide < Math.ceil(cards.length / cardsPerView) - 1) {
            goToSlide(currentSlide + 1);
        }
    });

    prevBtn.addEventListener('click', () => {
        const currentSlide = Math.floor(currentIndex / cardsPerView);
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    });

    // Touch and mouse events for dragging
    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        slider.classList.add('grabbing');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDragging = false;
        slider.classList.remove('grabbing');
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
        slider.classList.remove('grabbing');
        
        // Snap to nearest slide
        const slideWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
        const nearestSlide = Math.round(slider.scrollLeft / slideWidth);
        goToSlide(Math.min(nearestSlide, cards.length - 1));
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchend', () => {
        startX = null;
        // Snap to nearest slide
        const slideWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
        const nearestSlide = Math.round(slider.scrollLeft / slideWidth);
        goToSlide(Math.min(nearestSlide, cards.length - 1));
    });

    // Initialize first slide
    goToSlide(0);

    // Auto-advance slides every 5 seconds
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        goToSlide(currentIndex);
    }, 5000);

    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            goToSlide(currentIndex);
        }, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            goToSlide(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % cards.length;
            goToSlide(currentIndex);
        }
    });
});
