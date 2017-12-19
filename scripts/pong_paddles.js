var canvas = document.getElementById("background_canvas");
var canvas_context = canvas.getContext("2d");

function Paddle(x, y, width, height) {
  canvas_context.fillStyle="#FFFFFF";
  canvas_context.fillRect(x, y, width, height);
}

function Player() {
    new Paddle(780,175,20,150)
}

function Computer() {
    new Paddle(0,175,20,150)
}

function Ball() {
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  var radius = 5;
  var startAngle = 0 * Math.PI;
  var endAngle = 2 * Math.PI;

  canvas_context.beginPath();
  canvas_context.arc(x, y, radius, startAngle, endAngle);
  canvas_context.lineWidth = 10;
  canvas_context.strokeStyle = 'white';
  canvas_context.stroke();
}

function render() {
  new Computer;
  new Player;
  new Ball;
}

window.onload = function() {
  render();
}
