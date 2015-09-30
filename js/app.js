// Enemies our player must avoid
var Enemy = function() {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Setting the Enemy initial location
    var bugLocArray = [60, 145, 225];
    var randLoc = bugLocArray[Math.floor(Math.random() * bugLocArray.length)];

    this.x = -110;
    this.y = randLoc;

    // Setting the Enemy speed:
    this.speed = Math.floor(Math.random()*(100 - 50)) + 50;

    collision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Update the Enemy location
    if (this.x <= 700) {
        this.x += this.speed * dt;
    } 
    if (this.x >=510) {
        this.x = -110;
        this.y = [60, 145, 225][Math.floor(Math.random() * [60, 145, 225].length)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);       

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// **Player Class
var Player = function() {
    var canvas = document.getElementsByTagName('canvas');
    // The image/sprite for player
    this.sprite = 'images/char-boy.png';

    this.spriteCollision = 'images/Star.png';

    // Setting the Player intial location
    this.x = 200;
    this.y = 400;

    // Setting the initial Score
    startScore = 0;
    score = startScore;

    // Setting how much collision costs
    lostPoint = 10;

    // Setting how much reaching water gains
    addPoint = 50;

    // Setting lives
    startLives = 3;
    lives = startLives;

    // Setting score board
    topScore = 0;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // Reset the game when the player reachs the water, and place the player back to the initial location
    var pos = [this.x, this.y];
    if (pos[1] < 40) {
        this.x = 200;
        this.y = 400;
        score += addPoint;
    }

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30px Georgia";

    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText("THE FROGGER GAME", 0, 30);

    // Change style for Score text
    if (score >= 0) {
        ctx.fillStyle = "navy";
    };
    ctx.font = "18px Georgia";
    ctx.fillText("SCORE: " + score, 380, 18);

    // Change style for Lives
    ctx.fillStyle = "navy";
    ctx.fillText("LIVES: " + lives, 380, 40);

    // Draw Game Over
    if (lives <= 0) {
        ctx.font = "small-caps bold 60px Verdana";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER", 50, 320);
    }
};

// Method moves the player according to the user input
Player.prototype.handleInput = function(keyPressed) {
    // Left key moves the player to the left, and so on
    if (lives >= 1) {
        if (keyPressed === 'left' && this.x > 50) {
            this.x -= 101;
        }
        if (keyPressed === 'right' && this.x < 400) {
            this.x += 101;
        }
        if (keyPressed === 'up' && this.y > 50) {
            this.y -= 83;
        }
        if (keyPressed === 'down' && this.y < 400) {
            this.y += 83;
        }
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var numberOfEnemies = 2;
for (var i= 0; i < numberOfEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Collision Check
function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x + 50 > player.x &&
            allEnemies[i].x < player.x + 50 &&
            allEnemies[i].y + 50 > player.y &&
            allEnemies[i].y < player.y + 50) {
            player.x = 200;
            player.y = 400;
            score -= lostPoint;
            lives--;
        }
    }
};

// Restart the game
function Restart() {
    // Record the score if it is the highest.
    if (topScore <= score) {
        topScore = score;
        console.log(topScore);
        if (document.body.contains(document.getElementById('top-score'))) {
            para.removeChild(displayScore);
        }

        // Add the score to the Leader Board.
        element = document.getElementById('highest-score');
        para = document.createElement('p');
        para.id = 'top-score';
        displayScore = document.createTextNode(topScore);
        para.appendChild(displayScore);
        element.appendChild(para);
    } 
    score = startScore;
    lives = startLives;
}