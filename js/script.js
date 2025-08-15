document.addEventListener('DOMContentLoaded', function() {
    // Title sparkle effect
    const mainTitle = document.querySelector('.planner-title');
    
    if (mainTitle) {
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            const x = Math.random() * mainTitle.offsetWidth;
            const y = Math.random() * mainTitle.offsetHeight;
            
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            
            mainTitle.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, 300);
    }
    
    // Adding sparkle effect to the button
    const plannerButton = document.querySelector('.planner-button');
    
    if (plannerButton) {
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            const x = Math.random() * plannerButton.offsetWidth;
            const y = Math.random() * plannerButton.offsetHeight;
            
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            
            plannerButton.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 800);
        }, 400);
        const clickSound = new Audio('assets/sounds/pop.mp3'); // Update this path to your sound file
        
        // Add click event listener to play sound
        plannerButton.addEventListener('click', function(event) {
            // Play the sound
            clickSound.currentTime = 0; // Reset sound to start (allows for rapid clicks)
            clickSound.play()
                .catch(error => {
                    console.log('Sound play failed:', error);
                    // This error often happens if user hasn't interacted with the page yet
                });
            
            // If you want a visible feedback effect as well
            this.classList.add('button-clicked');
            setTimeout(() => {
                this.classList.remove('button-clicked');
            }, 200);
        });
    }
});
