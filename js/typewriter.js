document.addEventListener('DOMContentLoaded', function() {
    const typewriter = document.getElementById('typewriter');
    const roles = [
        'Software Engineer',
        'QA Engineer',
        'Full Stack Developer',
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    // Adjusted timing for smoother animation
    const timings = {
        typing: 150,      // Slower typing for smoother appearance
        deleting: 100,    // Slightly slower deleting
        pauseBeforeDelete: 2000,  // Longer pause before deleting
        pauseBeforeNext: 800,    // Pause before next word
    };

    function updateText() {
        const currentRole = roles[roleIndex];
        const currentText = currentRole.substring(0, charIndex);
        
        // Center the text by adding non-breaking spaces
        const maxLength = Math.max(...roles.map(role => role.length));
        const spacesNeeded = Math.floor((maxLength - currentText.length) / 2);
        const spaces = '\u00A0'.repeat(spacesNeeded); // Use non-breaking space
        
        typewriter.textContent = currentText;
        typewriter.style.minWidth = `${maxLength}ch`; // Set minimum width to prevent fluctuation
        typewriter.style.textAlign = 'center'; // Center the text
    }
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isWaiting) {
            isWaiting = false;
            if (isDeleting) {
                charIndex--;
            } else {
                isDeleting = true;
            }
            setTimeout(type, isDeleting ? timings.deleting : timings.typing);
            return;
        }
        
        if (isDeleting) {
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, timings.pauseBeforeNext);
                return;
            }
        } else {
            charIndex++;
            if (charIndex === currentRole.length) {
                isWaiting = true;
                setTimeout(type, timings.pauseBeforeDelete);
                return;
            }
        }
        
        updateText();
        setTimeout(type, isDeleting ? timings.deleting : timings.typing);
    }
    
    // Set initial styles
    typewriter.style.opacity = '1';
    typewriter.style.position = 'relative';
    typewriter.style.display = 'inline-block';
    typewriter.style.textAlign = 'center';
    
    // Start the typing effect
    type();
});
