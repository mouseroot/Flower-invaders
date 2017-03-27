//Display
var canvas,cx;
var width=640;
var height=480;

//Game Objects
var ship;
var flowers = [];
var droplets = [];
var title_shower = [];

//Keyboard
var Keys = {
  "UP_ARROW": 38,
  "DOWN_ARROW": 40,
  "LEFT_ARROW": 37,
  "RIGHT_ARROW": 39,
  "KEY_Z": 90,
  "KEY_X": 88,
  "RETURN": 13,
  "ESCAPE": 27,
  "SPACE": 32
}


//Game Variables
var score = 0;
var num_flowers = 10;
var max_droplets = 30;
var screen = 0;
var Screens = {
    "Title": 0,
    "Game": 1,
    "Results":2,
    "Pause":3
};

var charImage = new Image();
var hoseImage = new Image();
    


//Game Modules

//Adds a droplet to the array
function addDroplet(x,y) {
    if(droplets.length + 1 < max_droplets) {
        droplets.push(new Water(x,y));
    }
}

//Moves the flowers and handles if they hit the edge
function moveFlowers(shift) {
    var edge = false;
    for(var i=0;i < flowers.length;i++) {
        flowers[i].move();
        if(flowers[i].x > (width - flowers[i].width) || flowers[i].x < 0) {
            edge = true;
        }        
    }
    if(edge) {
        for(var i=0;i < flowers.length;i++) {
            flowers[i].shiftDown(shift);
        }
    }
}

//Moves the droplets and handles collisions
function moveDroplets() {
    for(var i=0;i < droplets.length;i++) {
        droplets[i].move(-1);
        for(var j=0;j < flowers.length;j++) {
            if(droplets[i].hits(flowers[j])) {
                flowers[j].grow();
                droplets[i].destroy();
            }
        }

        //Check if oob
        if(droplets[i].y <= 0) {
            droplets[i].destroy();
        }
    }
}

//Cleans up items marked for deletion
function cleanupInvalid() {
    //Check for invalid Droplets
    for(var i=droplets.length-1;i >= 0;i--) {
        if(!droplets[i].valid) {
            droplets.splice(i,1);
        }
    }

    //Check for invalid Flowers
    for(var i=flowers.length-1;i >= 0;i--) {
        if(!flowers[i].valid) {
            flowers.splice(i,1);
        }
    }  
}

//Loads Resources
function loadResources() {

    charImage.ready = false;
    charImage.onload = function() { 
        this.ready = true; 
    }
    charImage.src = "flower.png";

    hoseImage.ready = false;
    hoseImage.onload = function() {
        this.ready = true;
    }
    hoseImage.src = "hose.png";
}

function init() {
    //Get canvas and context
    canvas = document.getElementById("display");
    cx = canvas.getContext("2d");

    //Setup keyboard listeners
    document.addEventListener("keydown", function(e){
        keydown(e.keyCode);
    },false);
    document.addEventListener("keyup", function(e){
        keyup(e.keyCode);
    },false);

    //Init GameObjects
    ship = new Ship();

    //Create some Flowers
    for(var i=0;i < num_flowers;i++) {
        flowers[i] = new Flower(40 + (i * 55),80);
    }

    //Create title screen title_shower
    for(var i=0;i < 150;i++) {
        var rx = getRandomInt(0, width);
        var ry = getRandomInt(0,-height);
        title_shower[i] = new Water(rx,ry);
        //Hacky
        title_shower[i].draw = function() {
            cx.fillStyle = "rgba(0,0,55,0.2)";
            cx.fillRect(this.x, this.y, 5,15);
        }
    }

    //Load Assets
    loadResources();
}

function keydown(code) {
    //Title screen
    if(screen == Screens.Title) {
        if(code == Keys["RETURN"]) {
            screen = Screens.Game;
        }
    }
    //Game
    else if(screen == Screens.Game) {

        if(code == Keys["SPACE"]) {
            addDroplet(ship.x + 10, ship.y)
        }
        if(code == Keys["ESCAPE"]) {
            console.log("Escape");
            screen = Screens.Pause;
        }

        if(code == Keys["LEFT_ARROW"]) {
            ship.setDir(-1);
        }
        else if(code == Keys["RIGHT_ARROW"]) {
            ship.setDir(1);
        }
    }
    //Results Screen
    else if(screen == Screens.Results) {

    }
    //Pause
    else if(screen == Screens.Pause) {
        if(code == Keys["ESCAPE"] || code == Keys["RETURN"]) {
            screen = 1;
        }
    }

}

function keyup(code) {
    if(code != Keys["SPACE"]) {
        ship.setDir(0);
    }
}

var offsetx = width/2 - 100;
var offsety = height/2;


function update() {
    if(screen == Screens.Title) {
        for(var i=0;i < title_shower.length;i++) {
            title_shower[i].move(0.8);
            if(title_shower[i].y > height) {
                title_shower[i].y = getRandomInt(0, -height);
                title_shower[i].x = getRandomInt(0, width);
            }
        }
    }


    if(screen == Screens.Game) {
        ship.move();
        moveFlowers(5);
        moveDroplets();
        cleanupInvalid();
    }
}

function draw() {
    //Title screen
    if(screen == Screens.Title) {
        background("#aaa");
        for(var i=0;i < title_shower.length;i++) {
            title_shower[i].draw();
        }
        fillText(offsetx + 0,offsety + 2,"white","25px Consolas","Flower Invaders");
        fillText(offsetx + 10,offsety + 30,"black","15px Consolas","Strike Enter to Begin");

    }
    //Game
    else if(screen == Screens.Game) {   
        background("#ccc"); 
        fillText(5,18,"black","14pt Consolas","Score: " + score);
        fillText(5, 40,"black","14pt Consolas","Droplets: " + droplets.length);
        fillText(5, 62,"black","14pt Consolas","Flowers: " + flowers.length); 

        //Draw Flowers
        for(var i=0;i < flowers.length;i++) {
            flowers[i].draw();
        }
        
        //Draw Droplets
        for(var i=0;i < droplets.length;i++) {
            droplets[i].draw();   
        }

        ship.draw();      
    }
    else if(screen == Screens.Pause) {
        background("black");
        fillText(width/2,height/2,"red","29px Consolas","Paused");

    }
    
    update();
    requestAnimationFrame(draw);
}

init();
requestAnimationFrame(draw);