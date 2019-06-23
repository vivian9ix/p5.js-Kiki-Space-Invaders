var ship;
var aliens = [];
var bullets = []; 

var score = 0;
var start = true;

var bg;
var bgTwo;

var blinkingStart = true;

var dead = false;
var gamestart = false;

var highScore = 0;
var playAgain = false;

var myFont;

function preload() {
    bg = loadImage('barscreen.png');
  	bgTwo = loadImage('gamescreen.png');
    alienImg = loadImage('squirrel.png');
    shipImg = loadImage('kikihead.png');
  	bulletImg = loadImage('potato.png');
  	myFont= loadFont('happyfont.ttf');
  
  	hitSound= loadSound('wow.mp3');
  	mainSound= loadSound('box.mp3');
  	
} 

function setup() {
    createCanvas(800, 600);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;

    ship = new Ship();
    alienArray();
  
}

function draw() {
    background(bgTwo);
  	textFont(myFont);
    fill(243, 121, 121);
		
    startScreen();

    if (!start && !dead) {
        startUp();
    }
    else if (dead) {
        runDead();
    }
}


function alienArray() {
    var count = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 7; j++) {
            aliens[count] = new Alien(j * 60 + 40, 20 - i * 60);
            count++;
        }
    }
}


function startScreen() {
    if (start) {
        image(bg, 0, 0, width, height);
        fill(249, 233, 232);
        textSize(30);
        textAlign(CENTER, BASELINE);
        textStyle(BOLD);

        if (frameCount % 30 == 0) {
            if (blinkingStart) {
                blinkingStart = false;
            } else {
                blinkingStart = true;
                   
            }
        }
        if (blinkingStart) {
            text('PRESS SPACE TO START', 400, 500);
        }  
        startGame();
      	 
    }
}


function startUp() {
    bulletFunc();
    ship.move();
    ship.show();
    alienFunc();
    scoreFunc();
    endScreen();
}


function runDead() {
    alienFunc();
    scoreFunc();
    endScreen();

}


function bulletFunc() {
  	background(bgTwo);
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].show();
        bullets[i].move();

        
        for (var j = 0; j < aliens.length; j++) {
            if (bullets[i].hits(aliens[j])) {
                aliens[j].kill();
                bullets[i].kill();
              	hitSound.play();
            }
        }

        if (bullets[i].toDelete) {
            bullets.splice(i, 1);
        }
    }
}


function alienFunc() {
    var edge = false;
    for (var i = 0; i < aliens.length; i++) {

        if (aliens[i].hits(ship)) {
            dead = true;
          image(bg, width, height, 0, 0);
        }

        aliens[i].move();
        aliens[i].show();

        if (aliens[i].x > width - 15 || aliens[i].x < 15) {
            edge = true;
        }

        if (aliens[i].toDelete) {
            aliens.splice(i, 1);
        		}
    			}	

    		if (edge) {
        	for (var a = 0; a < aliens.length; a++) {
            aliens[a].shiftDown();
        		}
    			}
}


function scoreFunc() {
    strokeWeight(6);
    fill(243, 121, 121);
    textSize(40);
    text(score, 40, 30);
    text(highScore, width -40, 30);
    noStroke();
}


function endScreen() {
  	image(bg, width, height, 0, 0);
    textSize(90);
    fill(243, 121, 121);
    textAlign(CENTER, CENTER);
    if (!aliens.length) {
        playAgain = true;
        text('YOU WIN!', width / 2, height / 3);textSize(30);
        text('Click To Restart', width / 2, height / 1.7);
}
    else if (dead) {
        playAgain = true;
      	image(bg, width, height, 0, 0);
      	fill(243, 121, 121);
        text('YOU LOSE!', width / 2, height / 3);
        textSize(30);
        text('Click To Restart', width / 2, height / 1.7);
   			
    }
    
}

function reset() {
    aliens = [];
    bullets = [];
    score = 0;
    dead = false;
    start = true;
    blinkingMenu = true;
    alienArray();
    gamestart = false;
}


function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        ship.direction.right = true;
    }
    else if (keyCode === LEFT_ARROW) {
        ship.direction.left = true;
    }
    else if (keyCode == 32 && !start) {
        var bullet = new Bullet();
        bullets.push(bullet);
    } else if (keyCode == 32 && start) {
        gamestart = true;
    }
}

function keyReleased() {
    if (keyCode === RIGHT_ARROW) {
        ship.direction.right = false;
    }
    else if (keyCode === LEFT_ARROW) {
        ship.direction.left = false;
    }
}

function startGame() {
    if (gamestart) {
        start = false; 
        start = false; 
        start = false;
      	mainSound.play();
    }
}

function mousePressed() {
    if(playAgain){
        reset();
        playAgain = false;
    }
}
