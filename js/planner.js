// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskDropdown = document.getElementById('task-template');
    const customTaskContainer = document.getElementById('custom-task-container');
    const customTaskInput = document.getElementById('custom-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const progressBar = document.getElementById('progress-bar');
    const loveNote = document.getElementById('love-note');
    const loveNoteText = document.getElementById('love-note-text');
    const heartBurstContainer = document.getElementById('heart-burst-container');
    const confettiContainer = document.getElementById('confetti-container');
    
    <script src="../js/planner.js"></script>
    
    // Track tasks
    let tasks = [];
    
    // Event Listeners
    taskDropdown.addEventListener('change', handleTaskDropdownChange);
    addTaskButton.addEventListener('click', addTask);
    
    // Load tasks from localStorage
    loadTasks();
    updateProgress();
    
    // Functions
    function handleTaskDropdownChange() {
        if (taskDropdown.value === 'custom') {
            customTaskContainer.classList.remove('hidden');
            customTaskInput.focus();
        } else {
            customTaskContainer.classList.add('hidden');
        }
    }
    
    function addTask() {
        let taskText = '';
        
        if (taskDropdown.value === 'custom') {
            taskText = customTaskInput.value.trim();
            if (!taskText) return;
            customTaskInput.value = '';
        } else {
            taskText = taskDropdown.value;
            if (!taskText) return;
        }
        
        // Create task object
        const task = {
            id: Date.now().toString(),
            text: taskText,
            completed: false
        };
        
        // Add task to array
        tasks.push(task);
        
        // Add task to UI
        renderTask(task);
        
        // Reset dropdown
        taskDropdown.value = '';
        customTaskContainer.classList.add('hidden');
        
        // Save tasks to localStorage
        saveTasks();
        
        // Update progress
        updateProgress();
    }
    
    function renderTask(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.dataset.id = task.id;
        
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        
        taskItem.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'checked' : ''}"></div>
            <div class="task-text">${task.text}</div>
            <button class="delete-task">×</button>
        `;
        
        // Add click event for checkbox
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('click', () => {
            toggleTaskCompletion(task.id);
        });
        
        // Add click event for delete button
        const deleteButton = taskItem.querySelector('.delete-task');
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id);
        });
        
        taskList.appendChild(taskItem);
    }
    
    // Modify the toggleTaskCompletion function to properly add points
function toggleTaskCompletion(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        // Toggle completion status
        const wasCompleted = tasks[taskIndex].completed;
        tasks[taskIndex].completed = !wasCompleted;
        
        // Update UI
        const taskItem = document.querySelector(`.task-item[data-id="${taskId}"]`);
        const checkbox = taskItem.querySelector('.task-checkbox');
        
        if (tasks[taskIndex].completed) {
            taskItem.classList.add('completed');
            checkbox.classList.add('checked');
            
            // Add reward points (10 points per completed task)
            if (typeof addRewardPoints === 'function') {
                addRewardPoints(10); // Add points when completing
            }
            
            // Rest of your completion effects...
        } else {
            taskItem.classList.remove('completed');
            checkbox.classList.remove('checked');
            
            // Remove reward points if unchecking
            if (typeof addRewardPoints === 'function') {
                addRewardPoints(-10); // Remove points when unchecking
            }
        }
        
        saveTasks();
        updateProgress();
    }
}
    
    function deleteTask(taskId) {
        // Remove task from array
        tasks = tasks.filter(task => task.id !== taskId);
        
        // Remove task from UI
        const taskItem = document.querySelector(`.task-item[data-id="${taskId}"]`);
        taskItem.remove();
        
        // Save tasks
        saveTasks();
        
        // Update progress
        updateProgress();
    }
    
    function saveTasks() {
        localStorage.setItem('blushBabeTasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('blushBabeTasks');
        
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            
            // Render tasks
            tasks.forEach(task => {
                renderTask(task);
            });
        }
    }
    
    function updateProgress() {
        if (tasks.length === 0) {
            progressBar.style.width = '0%';
            progressBar.textContent = '0%';
            loveNote.classList.add('hidden');
            return;
        }
        
        const completedTasks = tasks.filter(task => task.completed);
        const progressPercentage = Math.round((completedTasks.length / tasks.length) * 100);
        
        // Update progress bar
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${progressPercentage}%`;
        
        // Show love note if all tasks completed
        if (completedTasks.length === tasks.length && tasks.length > 0) {
            showLoveNote();
            createConfetti();
        } else {
            loveNote.classList.add('hidden');
        }
    }
    
    function showLoveNote() {
        const loveNotes = [
            "Blush Babe, you totally rocked today! You're a literal angel on Earth, and tomorrow is another chance to glow even brighter! ✨",
            "OMG stop, you're too iconic! You've completed everything on your list, you absolute queen! 💖",
            "Look at you being THAT GIRL! So proud of your glow-up journey, keep shining bright! 💫",
            "Baddie status: ACHIEVED! You're absolutely slaying life right now, keep that energy! 🔥"
        ];
        
        const randomNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
        loveNoteText.textContent = randomNote;
        loveNote.classList.remove('hidden');
    }
    
    function createHeartBurst(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create 5 hearts
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-burst');
            
            // Random position around the click point
            const randomX = x + (Math.random() - 0.5) * 100;
            const randomY = y + (Math.random() - 0.5) * 100;
            
            heart.style.left = `${randomX}px`;
            heart.style.top = `${randomY}px`;
            
            heartBurstContainer.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }
    
    function createConfetti() {
        // Create confetti
        for (let i = 0; i < 100; i++) {
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
    
    function showFlirtyMessage() {
        const flirtyMessages = [
            "Omg STOP, you're literally iconic 😘",
            "Blush babe, you're on FIRE today 🔥",
            "One more tick & you're officially THAT GIRL 💖",
            "You're slaying so hard right now! 💅",
            "Queen behavior detected! 👑"
        ];
        
        const randomMessage = flirtyMessages[Math.floor(Math.random() * flirtyMessages.length)];
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('flirty-message');
        messageElement.textContent = randomMessage;
        
        document.body.appendChild(messageElement);
        
        // Remove message after animation completes
        setTimeout(() => {
            messageElement.remove();
        }, 1500);
    }
    
    function playCompletionSound() {
        // Create audio element for kiss sound
        const kissSound = new Audio('../assets/sounds/kiss.mp3');
        kissSound.volume = 0.3;
        kissSound.play().catch(err => {
            console.log('Audio playback prevented: User interaction required first');
        });
    }
});
