let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startStopBtn.textContent = 'Pause';
    isRunning = true;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startStopBtn.textContent = 'Start';
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    isRunning = false;
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(Date.now() - startTime);
        laps.appendChild(lapTime);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
