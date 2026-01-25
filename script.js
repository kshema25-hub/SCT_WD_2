// ================================
// SMART STOPWATCH - FULL JAVASCRIPT
// ================================

// Variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;

// Elements
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps");

// ================================
// Format Time Function
// ================================
function formatTime(ms) {
  let milliseconds = ms % 1000;
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / (1000 * 60)) % 60;
  let hours = Math.floor(ms / (1000 * 60 * 60));

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0") +
    "." +
    String(milliseconds).padStart(3, "0")
  );
}

// ================================
// Start / Pause Button
// ================================
startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);

    startBtn.textContent = "Pause";
    lapBtn.disabled = false;
    display.classList.add("running");
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    startBtn.textContent = "Start";
    display.classList.remove("running");
    isRunning = false;
  }
});

// ================================
// Lap Button
// ================================
lapBtn.addEventListener("click", () => {
  lapCount++;

  const li = document.createElement("li");

  li.innerHTML = `
    <span>Lap ${lapCount}</span>
    <span>${formatTime(elapsedTime)}</span>
  `;

  laps.appendChild(li);
});

// ================================
// Reset Button
// ================================
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);

  startTime = 0;
  elapsedTime = 0;
  lapCount = 0;
  isRunning = false;

  display.textContent = "00:00:00.000";
  startBtn.textContent = "Start";
  lapBtn.disabled = true;
  laps.innerHTML = "";
  display.classList.remove("running");
});
