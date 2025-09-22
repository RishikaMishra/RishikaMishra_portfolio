document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.project-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.project-card');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    const cardsPerView = window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1;
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
            dot.classList.toggle('active', index === Math.floor(currentIndex / cardsPerView));
        });
    }

    function updateButtons() {
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        
        const lastPossibleIndex = cards.length - cardsPerView;
        nextBtn.style.opacity = currentIndex >= lastPossibleIndex ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentIndex >= lastPossibleIndex ? 'none' : 'auto';
    }

    function updateActiveCards() {
        cards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + cardsPerView) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.opacity = '0.7';
                card.style.transform = 'scale(0.95)';
            }
        });
    }

    function goToSlide(slideIndex) {
        const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(cards[0]).marginRight);
        currentIndex = slideIndex * cardsPerView;
        
        // Ensure we don't go past the last possible position
        const maxIndex = cards.length - cardsPerView;
        currentIndex = Math.min(currentIndex, maxIndex);
        
        const translateX = -currentIndex * cardWidth;
        slider.style.transform = `translate3d(${translateX}px, 0, 0)`;
        
        updateDots();
        updateButtons();
        updateActiveCards();
    }

    // Navigation buttons
    nextBtn.addEventListener('click', () => {
        if (currentIndex + cardsPerView < cards.length) {
            goToSlide(Math.floor(currentIndex / cardsPerView) + 1);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(Math.floor(currentIndex / cardsPerView) - 1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            goToSlide(Math.floor(currentIndex / cardsPerView) - 1);
        } else if (e.key === 'ArrowRight' && currentIndex + cardsPerView < cards.length) {
            goToSlide(Math.floor(currentIndex / cardsPerView) + 1);
        }
    });

    // Touch handling
    let touchStartX = null;
    let touchStartY = null;
    let startScrollX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        startScrollX = currentIndex;
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (touchStartX === null) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        // Calculate distance moved
        const deltaX = touchStartX - touchX;
        const deltaY = touchStartY - touchY;
        
        // If horizontal scrolling is dominant
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
            
            const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(cards[0]).marginRight);
            const moveX = -deltaX;
            const translateX = -(startScrollX * cardWidth) + moveX;
            
            // Add some resistance at the edges
            if ((currentIndex === 0 && moveX > 0) || 
                (currentIndex >= cards.length - cardsPerView && moveX < 0)) {
                slider.style.transform = `translate3d(${translateX / 3}px, 0, 0)`;
            } else {
                slider.style.transform = `translate3d(${translateX}px, 0, 0)`;
            }
        }
    }, { passive: false });

    slider.addEventListener('touchend', (e) => {
        if (touchStartX === null) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchStartX - touchEndX;
        const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(cards[0]).marginRight);
        
        // Determine if we should move to next/previous slide
        if (Math.abs(deltaX) > cardWidth / 3) {
            if (deltaX > 0 && currentIndex + cardsPerView < cards.length) {
                // Swipe left - go next
                goToSlide(Math.floor(currentIndex / cardsPerView) + 1);
            } else if (deltaX < 0 && currentIndex > 0) {
                // Swipe right - go previous
                goToSlide(Math.floor(currentIndex / cardsPerView) - 1);
            }
        }
        
        // Reset to current slide position
        goToSlide(Math.floor(currentIndex / cardsPerView));
        
        touchStartX = null;
        touchStartY = null;
    }, { passive: true });

    // Initialize
    updateButtons();
    updateActiveCards();

    // Handle window resize
    window.addEventListener('resize', () => {
        const newCardsPerView = window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        if (newCardsPerView !== cardsPerView) {
            location.reload(); // Refresh page to update layout
        }
    });
});
