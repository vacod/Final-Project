/*
Final Project:  a sketch that includes your own custom class. 
It utilizes an array of class instances to build a moving system of objects
that each have their own collision logic.

Author: Valerie Baker

Version (last update): 3/21/19

Description: This programm is a bouncuy balls game. These balls are created with rings of color 
gradients thus creating a 3D effect. Each ball is an instance from the class Ball(). This
class creates a ball at a random location and controls its movement in a defined random 
direction. The ball is programmed to bounce of the walls of the screen. A ball can be 
selected (left mouse click) and mouse dragged to another location of the screen.
*/

let numberOfBalls = 2; // initial number of balls

let balls = [];  // array of ball objects
let totalBalls = 20; // max number of balls
let addBall = true;

let horPaddle;
let verPaddle;

let points = 0; 

function setup() {
  //createCanvas(windowWidth - 50, windowHeight) - 100;
  createCanvas(1200, 600);
  noStroke();

  img = loadImage("assets/winner.jpg");

  // Create the ball objects of type Ball and add them to the array balls[]
  for (let i = 0; i < totalBalls; i++){
    balls[i] = new Ball();
  }

  horPaddle = new Paddle('h');
  verPaddle = new Paddle('v');

}

function draw() {
	colorMode(RGB, 255);
	background(245, 154, 194);

  if (points >= 50) {
    image(img, 0, 0, width, height);
    fill (255);
    textSize(20);
    text("Reload the page to PLAY AGAIN", 20, 100); 
  } else {

    if (points == 10 )  { numberOfBalls = 3; }
    if (points == 20 )  { numberOfBalls = 4; }
    if (points == 30 )  { numberOfBalls = 5; }
    if (points == 40 )  { numberOfBalls = 6; }
    if (points == 50 )  { numberOfBalls = 7; }
    if (points == 60 )  { numberOfBalls = 8; }
    if (points == 70 )  { numberOfBalls = 9; }
    if (points == 80 )  { numberOfBalls = 10; }
     

  	// Display each ball; and make it move(travel) unless it is controlled by the mouse
  	for (let i = 0; i < numberOfBalls; i++){
  		balls[i].display();
      if (!balls[i].stopped) { // the ball has not been stopped by a mouse-click
      	balls[i].move(); // call the method move() from the class Ball()
      } else {
      	balls[i].x = mouseX; // setup the field x of the ball object to the location of mouseX
      	balls[i].y = mouseY; // setup the field y of the ball object to the location of mouseY
      }
  	}

    horPaddle.display(mouseX, horPaddle.y);
    verPaddle.display(verPaddle.x, mouseY);

    horPaddleLeft = horPaddle.x - horPaddle.width/2;
    horPaddleRight = horPaddle.x + horPaddle.width/2;
    horPaddleTop = horPaddle.y - horPaddle.height/2;
    horPaddleBot = horPaddle.y + horPaddle.height/2;

    verPaddleLeft = verPaddle.x - verPaddle.width/2;
    verPaddleRight = verPaddle.x + verPaddle.width/2;
    verPaddleTop = verPaddle.y - verPaddle.height/2;
    verPaddleBot = verPaddle.y + verPaddle.height/2;
   
    for (let i = 0; i < numberOfBalls; i++){
      ballTop = balls[i].y - balls[i].size/2;
      ballBot = balls[i].y + balls[i].size/2;
      ballLeft = balls[i].x - balls[i].size/2;
      ballRight = balls[i].x + balls[i].size/2;
   
      if (!balls[i].stopped) { 

        // Bounce back when the ball reaches the vertical paddle
         if ((balls[i].x + balls[i].size/2) >= (verPaddle.x - verPaddle.width/2)) {   
          if ((balls[i].y >= mouseY - verPaddle.height/2) && (balls[i].y <= mouseY + verPaddle.height/2 )) {
           balls[i].xSpeed = balls[i].xSpeed * (-1); 
            if (balls[i].xHit == 0) {           
              points = points + 2; 
              balls[i].xHit++;
            }
          }              
        } 

        if ((balls[i].y + balls[i].size/2) >= (horPaddle.y - horPaddle.height/2)) {   
          if ((balls[i].x >= mouseX - horPaddle.width/2) && (balls[i].x <= mouseX + horPaddle.width/2 )) {
             balls[i].ySpeed = balls[i].ySpeed * (-1); 
            if (balls[i].yHit == 0) {           
              points = points + 2; 
              balls[i].yHit++;
            }
          } 
        }

        if (balls[i].x < width/2) { balls[i].xHit = 0;} 

        if (balls[i].y < height/2) { balls[i].yHit = 0;}   
            
      }
    }

  fill(0, 102, 153);
  text("Points: " + points , 10, 60);
  textSize(20);
  text("Hit a ball to gain points - Miss a ball to lose points", width/ 3, 60);
  text("Click and drag a ball to reposition it.   Reload Page to Restart the Game.", width/4, 100);

  }
}
// Function that defines what happens when the mouse has been pressed. 
// It checks the location X and Y of the mouse. If it conincides with the location of a 
// ball or balls it stops the ball/s, and creates a flag 'stopped' so the main draw() loop
// will know to stop its motion and set new X and Y coordinates following the mouse location.
function mousePressed() {
	for (let i = 0; i < numberOfBalls; i++){
		if ((mouseX > balls[i].x - balls[i].size/2) && (mouseX < balls[i].x + balls[i].size/2)) {
			if ((mouseY > balls[i].y - balls[i].size/2) && (mouseY < balls[i].y + balls[i].size/2)) {
				balls[i].stopped = true;
			}
		}
	}
}

// Function that defines what happens when the mouse is released. It resets the flag
// 'stopped' so the main draw loop will know to continue the ball movement.
function mouseReleased() {
	for (let i = 0; i < numberOfBalls; i++){
		balls[i].stopped = false;
	}
}

// Class Ball creates a ball and sets its display, movement and collision logic
class Ball {

	// The class constructor sets the fields
  constructor(){
  	// Random ball size and location
  	this.size = random(width/30, width/10);
    this.x = random(this.size/2, width/5 - this.size/2);
    this.y = random(this.size/2, height/5 - this.size/2);
    
    // Set the random numbe of rings and random red, green and blue color values
    //this.rings = random(100, 1000);
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);

    // Randomize the ball traveling speed
    this.xSpeed = random(2, 8);
    this.ySpeed = random(2, 8);
  
    // By default, the ball travels - unless it has been mouse clicked
    this.stopped = false;

    this.xHit = 0;
    this.yHit = 0;

  }

  // Method to display the ball with its set number of rings, shades and colors
  display(){

  	//colorMode(RGB, 1000); // colorMode increased to 1000
    ellipseMode(CENTER);
    stroke(120);
    fill(this.red, this.green, this.blue);
    ellipse(this.x, this.y, this.size, this.size);
	  
  } 

  // Method to make the ball move (travel). The x and y location coordinates get 
  //increased by the set xSpeed and ySpeed fields everytime this method has been called.
  move(){

    if (this.x + this.size/2 >= width){
      this.x = random(this.size/2, width/5 - this.size/2);
      points--;
    }

    if (this.y + this.size/2 >= height){
      this.y = random(this.size/2, height/5 - this.size/2);
      points--;   
    }

  	this.x = this.x + this.xSpeed; // the x location increases by the xSpeed
   	this.y = this.y + this.ySpeed; // The y location increases by the ySpeed

    

   	// Bounce check. If the ball reaches the left or right screen edge then reverse 
   	// the xSpeed
   	//if ((this.x + this.size/2 >= width)||(this.x - this.size/2 <= 0)){
    if (this.x - this.size/2 <= 0){
   		this.xSpeed = this.xSpeed * (-1); 		
   	}

   	// Bounce check. If the ball reaches the top or bottom screen edge then reverse 
   	// the ySpeed
   	//if (((this.y + this.size/2) >= height) || (this.y - this.size/2 <= 0)){
    if (this.y - this.size/2 <= 0){
   		this.ySpeed = this.ySpeed * (-1);
   	}
   
  }

}

class Paddle {

  // The class constructor sets the fields
  

  constructor(orientation) {
   
    if ((orientation == 'h') || (orientation == 'H')) {
      this.width = width/5;
      this.height = 50;
      this.x = width/2;
      this.y = height - 10 - this.height/2;
    } else { // orientation == 'v' or orientation == 'V'
      this.width = 50;
      this.height = height/5; 
      this.x = width - 10 - this.width/2;
      this.y = height/2;      
    }
  }

  display(x, y) {
    push();
    rectMode(CENTER);
    fill(0);
    noStroke();
    rect(x, y, this.width, this.height) ;
    pop();
  }
}
  
  