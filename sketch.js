
let x = 0;
var ball;
let y;

function preload() {
  ball = loadImage("ball.gif", "0");
  // ball.size(200, 400);
  // ball.position(55, 50);
}

function setup() {
  createCanvas(1080, 1000);
  background('black');
}

  function mouseClicked() {
    if (x % 2 == 0) {
      ball.pause();
    }
    if (x % 2 == 1) {
      ball.play();
      y = ball.getCurrentFrame();
      print(y);
    }
    x++;
  }

  function draw() {

  }