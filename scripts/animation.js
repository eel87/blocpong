// Rate of game updates per second
var FPS = 60;
// Displacement constant of pixels per second
var PADDLE_SPEED = 360;
var BALL_SPEED = 300;

var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

// Create elements list to easily iterate through game elements
var elements = [];

// Create game elements using a "class"
var Element = function(x, y, width, height, vx, vy) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.vx = vx || 0; // default to 0 if not set
  this.vy = vy || 0; // default to 0 if not set

  elements.push(this);
};

//Element prototype to draw the game elements
Element.prototype.draw = function() {
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(this.x, this.y, this.width, this.height);
};
// Add movement
Element.prototype.move = function() {
  for (var i=0; i < elements.length; i++) {
    el = elements[i];
    if (el == this) {
      //don't check collision against yourself
      continue;
    }
    // bounce on horizontal collision
    if ((this.top() < el.bottom() && this.bottom() > el.top()) &&
        (this.right() < el.left() && this.right() + this.vx >= el.left() ||
         this.left() > el.right() && this.left() + this.vx <= el.right())) {
      this.vx = -this.vx;
      break;
    }
    // bounce on vertical collision
    if ((this.left() < el.right() && this.right() > el.left()) &&
        (this.bottom() < el.top() && this.bottom() + this.vy >= el.top() ||
         this.top() > el.bottom() && this.top() + this.vy <= el.bottom())) {
      this.vy = -this.vy;
      break;
    }
  }
    this.x += this.vx;
    this.y += this.vy;
};
// Helper prototype functions that return left and right x values, bottom and top y values of each element.
Element.prototype.left = function() {
  return this.x;
};
Element.prototype.right = function() {
  return this.x + this.width;
};
Element.prototype.top = function() {
  return this.y;
};
Element.prototype.bottom = function() {
  return this.y + this.height;
};

var computer = new Element(5, 150, 15, 100);
var player = new Element(580, 150, 15, 100);
var ball = new Element(300, 200, 10, 10,  -1 * BALL_SPEED / FPS, 0.9 * BALL_SPEED / FPS) ;
// create top and bottom walls
var topWall = new Element(0, -1, 600, 1);
var bottomWall = new Element(0, 400, 600, 1);

// Render the elements
function render() {
  computer.draw();
  player.draw();
  ball.draw();
}

window.onload = render();

// Control player paddle
window.onkeydown = function(event) {
  // go up if up arrow pressed
  if (event.keyCode === 38) {
    player.vy = -PADDLE_SPEED/FPS;
  }
  // go down if down arrow pressed
  if (event.keyCode === 40) {
    player.vy = PADDLE_SPEED/FPS;
  }
}
window.onkeyup = function(event) {
  player.vy = 0;
}

// Computer AI
var ai = function(paddle) {
  var prediction = (ball.vx/ball.vy) * (paddle.x - ball.x) + ball.y;
  if (prediction < paddle.top() + paddle.height * 1/8) {
    paddle.vy = -PADDLE_SPEED / FPS;
  } else if (prediction > paddle.top() + paddle.height * 1/8) {
    paddle.vy = PADDLE_SPEED / FPS;
  } else {
    paddle.vy = 0;
  }
};

// Game loop
var gameLoop = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < elements.length; i++) {
    elements[i].draw();
    elements[i].move();
  }
  ai(computer);
  // game rules
  if (ball.right() > canvas.width) {
    ball.x = 360;
    ball.y = 240;
  } else if (ball.left() < 0) {
    ball.x = 360;
    ball.y = 240;
  }
};

// Begin game on click
window.onclick = function(event) {
  setInterval(gameLoop, 1000/FPS);
};


// var Paddle = function(x, y, width, height, speed) {
//   canvas_context.fillStyle="#FFFFFF";
//   canvas_context.fillRect(x, y, width, height);
//   this.y = y;
//   this.move = function() {
//     this.y = this.y + 50
//   }
// };
//
// var Ball = function() {
//   var x = canvas.width / 2;
//   var y = canvas.height / 2;
//   var radius = 3;
//   var startAngle = 0 * Math.PI;
//   var endAngle = 2 * Math.PI;
//
//   canvas_context.beginPath();
//   canvas_context.arc(x, y, radius, startAngle, endAngle);
//   canvas_context.lineWidth = 6;
//   canvas_context.strokeStyle = 'white';
//   canvas_context.stroke();
// };
//
// var player = new Paddle(610,100,15,100);
//
// var computer = new Paddle(20,200,15,100);
//
// var ball = new Ball();
//
// function render() {
//   computer;
//   player;
//   ball;
// }
//
// var step = function() {
//   console.log('foo')
//   render();
//   player.move();
//   animate(step);
// };
//
// var animate = function(callback) {
//   window.requestAnimationFrame(callback) ||
//     function(callback) {
//       window.setTimeout(callback, 1000/60)
//     };
// }
//
// var movePaddle = function(e) {
//   if (e.keyCode == "40") {
//     animate(step);
//   } else if (e.keyCode == "38") {
//     animate(step);
//   }
// }
//
// window.onload = function() {
//   render();
// }
//
// window.addEventListener("keydown", movePaddle);
