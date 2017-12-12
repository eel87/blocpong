var canvas = document.getElementById("background_canvas");
var canvas_context = canvas.getContext("2d");

function Paddle(x, y, width, height) {
  canvas_context.fillStyle="#FFFFFF";
  canvas_context.fillRect(x, y, width, height);
}

function Computer() {
  new Paddle(0,175,20,150)
}

function Player() {
  new Paddle(780,175,20,150)
}

function Ball() {
  canvas_context.fillStyle="#FFFFFF";
  var ball_width = 10;
  var ball_height = 10;
  var x = 400;
  var y = 250;
  var cornerRadius = 5;

  canvas_context.beginPath();
  canvas_context.moveTo(x,y);
  canvas_context.lineTo(x + ball_width - cornerRadius, y);
  canvas_context.arcTo(x + ball_width, y, x + ball_width, y + cornerRadius, cornerRadius);
  canvas_context.lineTo(x + ball_width, y + ball_height);
  canvas_context.arcTo(x - ball_width, y, x + ball_width, y + cornerRadius, cornerRadius);
  canvas_context.lineWidth = 5;
  canvas_context.strokeStyle="#FF0000";
  canvas_context.stroke();
}

window.onload = function() {
  Computer();
  Player();
  Ball();
}
