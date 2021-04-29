let pepperIdle = false;
let pepperWaves = false;
let pepperSquare = false;

// variable to allow me to check the amount of frames
let x = 0;

let pepperWaveFrame;
let pepperSquareFrame;

let client = null;

try {
  client = mqtt.connect("wss://test.mosquitto.org:8081");
} catch (e) {
  console.log(e);
}

if (client) {
  // when connected
  client.on("connect", function () {
    console.log("subscribing...");
    // subscribe to this topic
    client.subscribe("pepper");
  });

  // when message receieved
  client.on("message", function (topic, message) {
    const msgString = message.toString();

    console.log(msgString);

    if (msgString.includes("wave")) {
      pepperWaves = true;
      pepperIdle = false;
      console.log("successful wave!");
    }

    if (msgString.includes("counter-clockwise")) {
      pepperSquare = true;
      pepperIdle = false;
      console.log("successful square!");
    }
    //   client.end();
  });
}

function preload() {
  pepperIdleGif = loadImage("animations/pepper.gif");
  pepperWaveGif = loadImage("animations/waving.gif");
  pepperSquareGif = loadImage("animations/square.gif");
}

function setup() {
  var canvas = createCanvas(450, 800);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent("sketch-holder");
}

function draw() {
  background(0);

  // gets the max frames of Idle Gif and Waving Gif
  let maxIdle = pepperIdleGif.numFrames() - 1;
  let maxWave = pepperWaveGif.numFrames() - 1;
  let maxSquare = pepperSquareGif.numFrames() - 1;

  // lets me know how many frames there are
  if (x == 0) {
    console.log(maxIdle);
    console.log(maxWave);
    console.log(maxSquare);
    x++;
  }

  if (pepperIdle) {
    image(pepperIdleGif, 0, 0, 375, 750);
    pepperIdleGif.play();
  } else {
    pepperIdleGif.reset();
  }

  pepperWaveFrame = pepperWaveGif.getCurrentFrame();
  pepperSquareFrame = pepperSquareGif.getCurrentFrame();
  // text(pepperWaveFrame, 400, 90);
  // fill("white");

  if (pepperWaves) {
    // console.log("Triggering Pepper Waves");
    image(pepperWaveGif, 0, 0, 375, 750);
    pepperWaveGif.play();
    if (pepperWaveFrame == 93) {
      pepperWaves = false;
      pepperIdle = true;
    }
  } else {
    pepperWaveGif.reset();
  }

  if (pepperSquare) {
    // console.log("Triggering Pepper Waves");
    image(pepperSquareGif, 0, 0, 375, 750);
    pepperSquareGif.play();
    if (pepperSquareFrame == 144) {
      pepperSquare = false;
      pepperIdle = true;
    }
  } else {
    pepperSquareGif.reset();
  }
}

function mousePressed() {
  if (pepperSquare) {
    pepperSquare = false;
    pepperIdle = true;
  } else {
    pepperSquare = true;
    pepperIdle = false;
  }
}
