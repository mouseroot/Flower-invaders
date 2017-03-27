function Flower(x, y) {
    this.x = x;
    this.y = y;
    this.xdir = 1;
    this.width = this.height = 30;
    this.valid = true;

    this.draw = function() {
        cx.strokeStyle = "green";
        cx.strokeRect(this.x, this.y, this.width, this.height);
        if(charImage.ready) {
            cx.drawImage(charImage,this.x, this.y,this.width, this.height);
        }

    }

    this.destroy = function() {
        this.valid = false;
    }

    this.move = function() {
        this.x = this.x + this.xdir;
    }

    this.shiftDown = function(size) {
        this.xdir *= -1;
        this.y += size;
    }

    this.grow = function() {
        if(this.width > 33 || this.height > 33) {
            this.destroy();
            score += 50;
        }
        this.width = this.height += 1;
    }

}