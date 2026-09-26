let circleX = 50;
let circleY = 50;
let speedX = 5;
let speedY = 5;
let size = 100;
let sizeIncrement = 1;
let radius = size / 2;
let rightColor = "blue";
let leftColor = "red";
let ballColor;
// indicates force on or off
let force = false;
// Add max size for ball
let MAX_SIZE = 200
let radial_force;
let force_angle;
let force_multiplier = 100;

function setup() {
  const canvas = createCanvas(800, 600);
  stroke("#ffffff");
}

function draw() {
  background(20);

  // left half is one color, right half is the other
  if (circleX > width / 2) {
    ballColor = rightColor;
  } else {
    ballColor = leftColor;
  }
  fill(ballColor);

  //Update speed with force
  if (force) {
    console.log("force on")
    radial_force = force_multiplier /sqrt((circleX - mouseX)**2 + (circleY - mouseY)**2);
    speedX -= (circleX - mouseX) * radial_force / sqrt((circleX - mouseX)**2 + (circleY - mouseY)**2);
    speedY -= (circleY - mouseY) * radial_force / sqrt((circleX - mouseX)**2 + (circleY - mouseY)**2);
    line(
        circleX, 
        circleY, 
        circleX - 100 * (circleX - mouseX)/ sqrt((circleX - mouseX)**2 + (circleY - mouseY)**2), 
        circleY - 100 * (circleY - mouseY) / sqrt((circleX - mouseX)**2 + (circleY - mouseY)**2)
    )
  }

  // move
  circleX = circleX + speedX;
  circleY = circleY + speedY;

  // grow (or shrink)
  size = size + sizeIncrement;
  // do not allow negative size
  if (size < 0) {
    size = abs(size);
    sizeIncrement = abs(sizeIncrement);
  }
  // do not allow past certain size
  if (size >= MAX_SIZE) {
    sizeIncrement = - abs(sizeIncrement);
  }
  radius = size / 2;

  // bounce off the left and right walls, and flip growing/shrinking
  /*
  if (circleX >= width - radius || circleX < radius) {
    speedX = speedX * -1;
    sizeIncrement = sizeIncrement * -1;
  }
  */
  if (circleX >= width - radius) {
    speedX = - abs(speedX);
    circleX = width - radius;
    sizeIncrement = sizeIncrement * -1;
  }
  if (circleX < radius) {
    speedX = abs(speedX);
    circleX = radius;
    sizeIncrement = sizeIncrement * -1;
  }

  if (circleY >= height - radius) {
    speedY = - abs(speedY)
  }
  if (circleY < radius) {
    speedY = abs(speedY)
  }

  // bounce off the top and bottom walls
  /*
  if (circleY >= height - radius || circleY < radius) {
    speedY = speedY * -1;
  }
  */

  circle(circleX, circleY, size);
}

// activate the repellant force when pressed down
function mousePressed() {
  force = true;
}

//de-activate force when mouse is released
function mouseReleased(event) {
    force = false;
}