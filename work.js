let countdown = 0; // variable to set/clear intervals
let seconds = 1200; // seconds left on the clock
let workTime = 25;
let breakTime = 5;
let isWork = true;
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

var reading = document.getElementsByClassName("reading");
var isReading = false;
reading[0].style.display = "none";
var breaking = document.getElementsByClassName("break");
breaking[0].style.display = "none";
var hiding = document.getElementsByClassName("hideDivs");

const breakingGif = document.querySelector(".breaking-gif");

// Adding event listeners for the start and reset button
startBtn.addEventListener("click", () => {
  clearInterval(countdown);
  isPaused = !isPaused;
  startPomodoro();

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
  isWork = true;
});

// timer, which will handle the countdown
function timer() {
  seconds--;

  // if seconds is less than 0, then clear the countdown, play the alarm,
  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();

    if (isWork == true) {
      breaking[0].style.display = "block";
      reading[0].style.display = "none";
    } else {
      breaking[0].style.display = "none";
      reading[0].style.display = "block";
    }
    // breakingGif.src = "";
    breakingGif.src = "animations/break.gif" + "?a=" + Math.random();

    countdown = setInterval(timer, 1000);

    // checking if it is break, if break, then breaktime; if not, worktime --> set that * 60 to seconds
    seconds = (isWork ? breakTime : workTime) * 60;
    isWork = !isWork;
    if (seconds < 0) {
      reading[0].style.display = "block";
      breaking[0].style.display = "none";
      // breakingGif.src = "";
      breakingGif.src = "animations/break.gif" + "?a=" + Math.random();
    }
  }
}

// update work times and break times
// what the buttons increment by
let increment = 5;

let incrementFunctions = {
  // max you can go up to is 60 mins
  "#work-plus": function () {
    workTime = Math.min(workTime + increment, 60);
  },
  "#work-minus": function () {
    // min you can go down to is 5 minutes
    workTime = Math.max(workTime - increment, 5);
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
  isWork
    ? (status.textContent = "Keep Working")
    : (status.textContent = "Take a Break!");
  workMin.textContent = workTime;
  breakMin.textContent = breakTime;
}

function startPomodoro() {
  // if in a break
  if (isWork) {
    if (hiding[0].style.display === "none") {
      hiding[0].style.display = "block";
      reading[0].style.display = "none";
    } else {
      hiding[0].style.display = "none";
      reading[0].style.display = "block";
    }
  }
  if (!isWork) {
    if (hiding[0].style.display === "none") {
      hiding[0].style.display = "block";
      breaking[0].style.display = "none";
    } else {
      hiding[0].style.display = "none";
      breaking[0].style.display = "block";
    }
  }
}

window.setInterval(updateHTML, 100);

document.onclick = updateHTML;
