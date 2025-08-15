// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const pointsValue = document.getElementById('points-value');
    const rewardButtons = document.querySelectorAll('.reward-button');
    const redeemedRewardsContainer = document.getElementById('redeemed-rewards');
    const successMessage = document.getElementById('success-message');
    const confettiContainer = document.getElementById('confetti-container');
    
    // Initialize points from localStorage
    let points = parseInt(localStorage.getItem('blushBabePoints')) || 0;
    let redeemedRewards = JSON.parse(localStorage.getItem('blushBabeRedeemedRewards')) || [];
    
    // Update points display
    updatePointsDisplay();
    
    // Load redeemed rewards
    loadRedeemedRewards();
    
    // Add event listeners to reward buttons
    rewardButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rewardCard = this.closest('.reward-card');
            const rewardName = rewardCard.querySelector('h3').textContent;
            const rewardCost = parseInt(rewardCard.dataset.cost);
            
            claimReward(rewardName, rewardCost);
        });
    });
    
    // Functions
    function updatePointsDisplay() {
        pointsValue.textContent = points;
        
        // Update reward button states
        rewardButtons.forEach(button => {
            const rewardCard = button.closest('.reward-card');
            const rewardCost = parseInt(rewardCard.dataset.cost);
            
            if (points >= rewardCost) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        });
    }
    
    function claimReward(rewardName, rewardCost) {
        if (points < rewardCost) {
            showMessage("You don't have enough points for this reward yet! Keep slaying!", false);
            return;
        }
        
        // Deduct points
        points -= rewardCost;
        localStorage.setItem('blushBabePoints', points.toString());
        
        // Add to redeemed rewards
        const reward = {
            name: rewardName,
            cost: rewardCost,
            date: new Date().toLocaleDateString()
        };
        
        redeemedRewards.unshift(reward);
        localStorage.setItem('blushBabeRedeemedRewards', JSON.stringify(redeemedRewards));
        
        // Update UI
        updatePointsDisplay();
        loadRedeemedRewards();
        
        // Show success message
        showMessage(`You claimed "${rewardName}"! Treat yourself, queen! 👑`, true);
        
        // Create confetti
        createConfetti();
    }
    
    function loadRedeemedRewards() {
        if (redeemedRewards.length === 0) {
            redeemedRewardsContainer.innerHTML = `
                <div class="no-rewards">No rewards claimed yet - keep slaying to earn treats!</div>
            `;
            return;
        }
        
        redeemedRewardsContainer.innerHTML = '';
        
        redeemedRewards.forEach(reward => {
            const rewardItem = document.createElement('div');
            rewardItem.className = 'redeemed-item';
            
            // Get appropriate icon based on reward name
            let iconClass = 'fa-gift'; // default
            
            if (reward.name.includes('Spa')) iconClass = 'fa-spa';
            else if (reward.name.includes('Movie')) iconClass = 'fa-film';
            else if (reward.name.includes('Treat')) iconClass = 'fa-shopping-bag';
            else if (reward.name.includes('Dessert')) iconClass = 'fa-ice-cream';
            else if (reward.name.includes('Outfit')) iconClass = 'fa-tshirt';
            else if (reward.name.includes('Splurge')) iconClass = 'fa-heart';
            
            rewardItem.innerHTML = `
                <div class="redeemed-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="redeemed-details">
                    <div class="redeemed-name">${reward.name}</div>
                    <div class="redeemed-date">Claimed on ${reward.date} • ${reward.cost} points</div>
                </div>
            `;
            
            redeemedRewardsContainer.appendChild(rewardItem);
        });
    }
    
    function showMessage(message, isSuccess) {
        successMessage.textContent = message;
        successMessage.classList.remove('hidden');
        
        if (isSuccess) {
            successMessage.style.backgroundColor = 'rgba(255, 138, 194, 0.9)';
        } else {
            successMessage.style.backgroundColor = 'rgba(255, 99, 132, 0.9)';
        }
        
        // Hide message after animation
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 3000);
    }
    
    function createConfetti() {
        // Create confetti
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random position, size, color, and animation duration
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const animDuration = Math.random() * 3 + 2;
            const colors = ['#FF8AC2', '#FFA6D2', '#FFD1E8', '#FFFFFF', '#9C2897'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${left}%`;
            confetti.style.top = '-20px';
            confetti.style.animationDuration = `${animDuration}s`;
            confetti.style.backgroundColor = randomColor;
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation completes
            setTimeout(() => {
                confetti.remove();
            }, animDuration * 1000);
        }
    }
    
    // Function to add points (to be called from planner.js when tasks are completed)
    window.addRewardPoints = function(pointsToAdd) {
        points += pointsToAdd;
        localStorage.setItem('blushBabePoints', points.toString());
        updatePointsDisplay();
    };
});
// Make sure this is at the bottom of rewards.js
window.addRewardPoints = function(pointsToAdd) {
    points += pointsToAdd;
    localStorage.setItem('blushBabePoints', points.toString());
    updatePointsDisplay();
    
    // Show notification for point changes
    const message = pointsToAdd > 0 
        ? `+${pointsToAdd} points! Keep slaying! 💖` 
        : `${pointsToAdd} points removed`;
    showMessage(message, pointsToAdd > 0);
};
