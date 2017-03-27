function Water(x,y) {
  this.x = x;
  this.y = y;
  this.width = 5;
  this.height = 15;
  this.valid = true;
  
  this.draw = function() {
    cx.strokeStyle = "green";
    cx.strokeRect(this.x, this.y, this.width, this.height);
    cx.fillStyle = "rgba(0,0,255,0.4)";
    cx.fillRect(this.x, this.y, 5,15);
  }
  
  this.destroy = function() {
    this.valid = false;
  }
  
  this.move = function(dir) {
    this.y += (dir)*5;
  }
  
  this.hits = function(flower) {
    return RectCollision(this, flower);
  }
}