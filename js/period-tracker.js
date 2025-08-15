// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const gratitudeInput = document.getElementById('gratitude');
    const proudInput = document.getElementById('proud');
    const tomorrowInput = document.getElementById('tomorrow');
    const saveReflectionButton = document.getElementById('save-reflection');
    const generateAffirmationButton = document.getElementById('generate-affirmation');
    const affirmationText = document.getElementById('affirmation-text');
    const reflectionsContainer = document.getElementById('reflections-container');
    const floatingHeartsContainer = document.querySelector('.floating-hearts-container');
    
    // Create floating hearts
    createFloatingHearts();
    
    // Load saved reflections
    loadReflections();
    
    // Generate random affirmation on page load
    generateRandomAffirmation();
    
    // Event Listeners
    saveReflectionButton.addEventListener('click', saveReflection);
    generateAffirmationButton.addEventListener('click', generateRandomAffirmation);
    
    // Functions
    function saveReflection() {
        const gratitude = gratitudeInput.value.trim();
        const proud = proudInput.value.trim();
        const tomorrow = tomorrowInput.value.trim();
        
        if (!gratitude && !proud && !tomorrow) {
            showMessage('Please fill in at least one field for your reflection! 💕');
            return;
        }
        
        // Create reflection object
        const reflection = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            gratitude: gratitude,
            proud: proud,
            tomorrow: tomorrow
        };
        
        // Get existing reflections
        let reflections = [];
        const savedReflections = localStorage.getItem('blushBabeReflections');
        
        if (savedReflections) {
            reflections = JSON.parse(savedReflections);
        }
        
        // Add new reflection
        reflections.unshift(reflection);
        
        // Save to localStorage
        localStorage.setItem('blushBabeReflections', JSON.stringify(reflections));
        
        // Clear form
        gratitudeInput.value = '';
        proudInput.value = '';
        tomorrowInput.value = '';
        
        // Show success message
        showMessage('Reflection saved! Keep that self-love flowing! 💖');
        
        // Reload reflections
        loadReflections();
    }
    
    function loadReflections() {
        reflectionsContainer.innerHTML = '';
        
        const savedReflections = localStorage.getItem('blushBabeReflections');
        
        if (savedReflections) {
            const reflections = JSON.parse(savedReflections);
            
            if (reflections.length > 0) {
                reflections.forEach(reflection => {
                    renderReflection(reflection);
                });
            } else {
                showNoReflections();
            }
        } else {
            showNoReflections();
        }
    }
    
    function renderReflection(reflection) {
        const reflectionItem = document.createElement('div');
        reflectionItem.className = 'reflection-item';
        
        let content = `
            <div class="reflection-date">${reflection.date}</div>
            <div class="reflection-content">
        `;
        
        if (reflection.gratitude) {
            content += `
                <div class="reflection-section">
                    <strong>Grateful for:</strong> ${reflection.gratitude}
                </div>
            `;
        }
        
        if (reflection.proud) {
            content += `
                <div class="reflection-section">
                    <strong>Proud of:</strong> ${reflection.proud}
                </div>
            `;
        }
        
        if (reflection.tomorrow) {
            content += `
                <div class="reflection-section">
                    <strong>Tomorrow I will:</strong> ${reflection.tomorrow}
                </div>
            `;
        }
        
        content += `</div>`;
        
        reflectionItem.innerHTML = content;
        reflectionsContainer.appendChild(reflectionItem);
    }
    
    function showNoReflections() {
        reflectionsContainer.innerHTML = `
            <div class="no-reflections">
                No reflections yet. Start your self-love journey today!
            </div>
        `;
    }
    
    function generateRandomAffirmation() {
        const affirmations = [
            "I am absolutely fabulous just the way I am! 💕",
            "I deserve all the love and happiness in the world! 💖",
            "I am a beautiful soul inside and out! ✨",
            "I radiate confidence, self-love, and inner beauty! 💋",
            "I love myself unconditionally and accept myself fully! 🌸",
            "I am worthy of my dreams and goals! 💫",
            "Every day I'm becoming more and more of THAT girl! 💅",
            "I am strong, I am beautiful, I am enough! 👑",
            "My self-worth is not determined by others' opinions! 💗",
            "I embrace my uniqueness - it's my superpower! ⚡",
            "I trust myself and the decisions I make! 💭",
            "I am in charge of my own happiness! 🌈",
            "I celebrate all my victories, big and small! 🎉"
        ];
        
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        affirmationText.textContent = affirmations[randomIndex];
        
        // Add sparkle animation
        addSparkleToAffirmation();
    }
    
    function addSparkleToAffirmation() {
        const sparkle = document.createElement('span');
        sparkle.className = 'affirmation-sparkle';
        affirmationText.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    function createFloatingHearts() {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            
            // Random position and animation duration
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const size = Math.random() * 15 + 10;
            
            heart.style.left = `${left}%`;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationDuration = `${10 + Math.random() * 20}s`;
            
            // Random heart color
            const colors = ['#ff7eb9', '#ff65a3', '#ff2e63', '#ff1654', '#ff85a1'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            heart.style.backgroundColor = randomColor;
            
            floatingHeartsContainer.appendChild(heart);
        }
    }
    
    // Message notification function
    function showMessage(message) {
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = 'notification-message';
        messageElement.textContent = message;
        
        // Add to document
        document.body.appendChild(messageElement);
        
        // Show the message
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            messageElement.classList.remove('show');
            
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 3000);
    }
    
    // Allow deleting reflections by clicking on them
    reflectionsContainer.addEventListener('dblclick', function(e) {
        const reflectionItem = e.target.closest('.reflection-item');
        
        if (reflectionItem) {
            const confirmDelete = confirm('Would you like to delete this reflection?');
            
            if (confirmDelete) {
                // Get the reflection date for identification
                const reflectionDate = reflectionItem.querySelector('.reflection-date').textContent;
                
                // Get saved reflections
                const savedReflections = localStorage.getItem('blushBabeReflections');
                
                if (savedReflections) {
                    let reflections = JSON.parse(savedReflections);
                    
                    // Find and remove the reflection
                    reflections = reflections.filter(r => 
                        r.date !== reflectionDate || 
                        !reflectionItem.textContent.includes(r.gratitude || '') ||
                        !reflectionItem.textContent.includes(r.proud || '') ||
                        !reflectionItem.textContent.includes(r.tomorrow || '')
                    );
                    
                    // Save updated reflections
                    localStorage.setItem('blushBabeReflections', JSON.stringify(reflections));
                    
                    // Reload reflections
                    loadReflections();
                    
                    // Show message
                    showMessage('Reflection deleted! 💭');
                }
            }
        }
    });
});
