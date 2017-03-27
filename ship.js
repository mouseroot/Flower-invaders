function Ship() {
  this.x = (width/2) -30;
  this.y = height-40;
  this.width = 30;
  this.height = 30;
  this.xdir = 0;
  
  this.draw = function() {
    cx.strokeStyle = "green";
    cx.strokeRect(this.x, this.y,this.width, this.height);
    if(hoseImage.ready) {
      cx.drawImage(hoseImage,this.x, this.y, this.width, this.height);
    }
  }

  this.setDir = function(dir) {
    this.xdir = dir;
  }
  
  this.move = function(dir) {
    this.x += this.xdir*5;
  }
}