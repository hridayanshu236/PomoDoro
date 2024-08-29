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

//function to playClickSound
function playClickSound (){
    const sound = document.getElementById('click-sound');
    if(sound){
        sound.currentTime = 0.6;
        sound.play();
    }
}
//function to playAlarmSound
function playAlarmSound (){
    const sound = document.getElementById('alarm-sound');
    if(sound){
        sound.currentTime = 1;
        sound.play();
    }
}

function setBodyBackground(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
}

function clearButtonStyles() {
    pomoButton.style.background = 'transparent';
    shortBreakButton.style.background = 'transparent';
    longBreakButton.style.background = 'transparent';
}

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
    playClickSound();
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
            playAlarmSound();
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
    clearButtonStyles();
    pomoButton.style.background = 'rgba(255, 255, 255, 0.1)';
    setBodyBackground('./assets/bg3.gif');
    playClickSound();
}

// Set timer for Short Break
function setShortBreak() {
    remainingTime = SHORT_BREAK_TIME;
    resetTimer();
    clearButtonStyles();
    shortBreakButton.style.background = 'rgba(255, 255, 255, 0.1)';
    setBodyBackground('./assets/bg2.gif');
    playClickSound();
    
}

// Set timer for Long Break
function setLongBreak() {
    remainingTime = LONG_BREAK_TIME;
    resetTimer();
    clearButtonStyles();
    longBreakButton.style.background = 'rgba(255, 255, 255, 0.1)'
    setBodyBackground('./assets/bg1.gif');
    playClickSound();
    
}


startButton.addEventListener('click', startCountdown);
pomoButton.addEventListener('click', setPomodoro);
shortBreakButton.addEventListener('click', setShortBreak);
longBreakButton.addEventListener('click', setLongBreak);
