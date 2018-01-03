var canvas = document.getElementById("background_canvas");
var canvas_context = canvas.getContext("2d");

var Paddle = function(x, y, width, height) {
  canvas_context.fillStyle="#FFFFFF";
  canvas_context.fillRect(x, y, width, height);
}

function Player() {
    new Paddle(610,200,15,100)
}

function Computer() {
    new Paddle(20,200,15,100)
}

function Ball() {
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  var radius = 3;
  var startAngle = 0 * Math.PI;
  var endAngle = 2 * Math.PI;

  canvas_context.beginPath();
  canvas_context.arc(x, y, radius, startAngle, endAngle);
  canvas_context.lineWidth = 6;
  canvas_context.strokeStyle = 'white';
  canvas_context.stroke();
}

function render() {
  new Computer;
  new Player;
  new Ball;
}

<<<<<<< HEAD
var animate = window.requestAnimationFrame || function(callback) {
  window.setTimeout(callback, 1000/60)
};

=======
>>>>>>> chkpt-2-add-visuals
window.onload = function() {
  render();
}
