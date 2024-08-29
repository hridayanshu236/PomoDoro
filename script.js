const POMODORO_TIME = 1500; // 25 minutes in seconds
const SHORT_BREAK_TIME = 300; // 5 minutes in seconds
const LONG_BREAK_TIME = 900; // 15 minutes in seconds

let remainingTime = POMODORO_TIME;
let isRunning = false;
let interval;

const timerElement = document.getElementById('time');
const startButton = document.getElementById('start');
const pomoButton = document.getElementById('pomodoro');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Function to update the timer display
function updateTimer() {
    timerElement.textContent = formatTime(remainingTime);
}

// Reset and stop the timer
function resetTimer() {
    clearInterval(interval); // Clear any existing interval
    updateTimer(); // Update display
    isRunning = false; // Timer is not running
    startButton.textContent = 'Start'; // Change button text back to 'Start'
}

// Start the countdown
function startCountdown() {
    if (isRunning) {
        resetTimer(); // If running, reset the timer
        return;
    }
    
    isRunning = true; // Mark the timer as running
    startButton.textContent = 'Pause'; // Change button text to 'Reset'
    
    updateTimer();

    interval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(interval);
            timerElement.textContent = '00:00';
            isRunning = false; // Timer stopped
            startButton.textContent = 'Start'; // Change button text back to 'Start'
        } else {
            remainingTime--;
            updateTimer();
        }
    }, 1000);
}

// Set timer for Pomodoro
function setPomodoro() {
    remainingTime = POMODORO_TIME;
    resetTimer();
}

// Set timer for Short Break
function setShortBreak() {
    remainingTime = SHORT_BREAK_TIME;
    resetTimer();
}

// Set timer for Long Break
function setLongBreak() {
    remainingTime = LONG_BREAK_TIME;
    resetTimer();
}

// Attach event listeners to the buttons
startButton.addEventListener('click', startCountdown);
pomoButton.addEventListener('click', setPomodoro);
shortBreakButton.addEventListener('click', setShortBreak);
longBreakButton.addEventListener('click', setLongBreak);
