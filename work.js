let countdown = 0; // variable to set/clear intervals
let seconds = 1200; // seconds left on the clock
let workTime = 20;
let breakTime = 5;
let isBreak = true;
let isPaused = true;

const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

const alarm = document.createElement("audio");

// A bell sound will play when the timer reaches 0
alarm.setAttribute(
  "src",
  "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
);

var y = document.getElementsByClassName("reading");
y[0].style.display = "none";
var z = document.getElementsByClassName("break");
z[0].style.display = "none";

// Adding event listeners for the start and reset button
startBtn.addEventListener("click", () => {
  clearInterval(countdown);
  isPaused = !isPaused;

  // if it is not paused, set countdown timer to decrease every 1000 ms
  if (!isPaused) {
    countdown = setInterval(timer, 1000);
  }
});

// reset button checker, if it is clicked, set countdown to 0 and pause
resetBtn.addEventListener("click", () => {
  clearInterval(countdown);
  seconds = workTime * 60;
  countdown = 0;
  isPaused = true;
  isBreak = true;
});

// timer, which will handle the countdown
function timer() {
  seconds--;

  // if seconds is less than 0, then clear the countdown, play the alarm,
  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();

    y[0].style.display = "none";
    z[0].style.display = "block";

    // checking if it is break, if break, then breaktime; if not, worktime --> set that * 60 to seconds
    seconds = (isBreak ? breakTime : workTime) * 60;
    isBreak = !isBreak;
  }
}

// update work times and break times
let increment = 1;

let incrementFunctions = {
  "#work-plus": function () {
    workTime = Math.min(workTime + increment, 60);
  },
  "#work-minus": function () {
    workTime = Math.max(workTime - increment, 1);
  },
  "#break-plus": function () {
    breakTime = Math.min(breakTime + increment, 60);
  },
  "#break-minus": function () {
    breakTime = Math.max(breakTime - increment, 5);
  },
};

for (var key in incrementFunctions) {
  if (incrementFunctions.hasOwnProperty(key)) {
    document.querySelector(key).onclick = incrementFunctions[key];
  }
}

// Update html content
function countdownDisplay() {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
}

function buttonDisplay() {
  if (isPaused && countdown === 0) {
    startBtn.textContent = "START";
  } else if (isPaused && countdown !== 0) {
    startBtn.textContent = "Continue";
  } else {
    startBtn.textContent = "Pause";
  }
}

function updateHTML() {
  countdownDisplay();
  buttonDisplay();
  isBreak
    ? (status.textContent = "Keep Working")
    : (status.textContent = "Take a Break!");
  workMin.textContent = workTime;
  breakMin.textContent = breakTime;
}

function startPomodoro() {
  var x = document.getElementsByClassName("hideDivs");
  if (x[0].style.display === "none") {
    x[0].style.display = "block";
    y[0].style.display = "none";
  } else {
    x[0].style.display = "none";
    y[0].style.display = "block";
  }
}

// function setup() {
//   var canvas = createCanvas(450, 800);
//   // Move the canvas so it’s inside our <div id="sketch-holder">.
//   canvas.parent("work-sketch-holder");
// }

window.setInterval(updateHTML, 100);

document.onclick = updateHTML;
