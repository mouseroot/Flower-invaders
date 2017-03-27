//Util Functions
function RectCollision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    return true;
  } else {
    return false;
  }
}

function distance(x1, x2, y1, y2) {
  var a = x1 - x2
  var b = y1 - y2
  return Math.sqrt( a*a + b*b );
}

function fillText(x,y, color,font, text) {
  cx.fillStyle = color;
  cx.font = font;
  cx.fillText(text,x,y);
}

function background(color) {
  cx.fillStyle = color;
  cx.fillRect(0,0,width,height);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}