// Enemies our player must avoid
let enemiesX = [];
let enemiesY = [];


const Enemy = function(x, y, v) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // this.sprite = 'images/enemy-bug.png';
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.v = v;

    enemiesX.push(this.x);
    enemiesY.push(this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.v * dt;
    if (this.x > 500) {
        this.x = -100;
    };

    enemiesX.push(this.x);
    enemiesX = enemiesX.slice(-6);
    enemiesY.push(this.y);
    enemiesY = enemiesY.slice(-6);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let playerPosition = [];

const Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}


Player.prototype.update = function() {
    if (this.y === 0 ) {
        alert('You win!!');
        this.y = 435;
    };
    
    for (let i = 0; i < enemiesX.length; i++) {
        if((Math.abs(enemiesX[i] - playerPosition[0]) < 70) && (enemiesY[i] === playerPosition[1])) {
            this.y = 435;
            alert('Failed')
        };
    };

    playerPosition = [];
    playerPosition = [this.x, this.y];
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(movement) {
    switch (movement) {
        case 'left':
            this.x > 0 ? this.x -= 37.5 : null;
            break;
        case 'right':
            this.x < 400 ? this.x += 37.5 : null;
            break;
        case 'up':
            this.y > 0 ? this.y -= 75 : this.y = 0;
            break;
        case 'down':
            this.y < 400 ? this.y += 75 : null;
            break;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(-100, 60, 250), new Enemy(-300, 60, 400), new Enemy(-50, 135, 300), new Enemy(-400, 135, 350), new Enemy(-150, 210, 350), new Enemy(-500, 210, 450)]
const player = new Player(200, 435);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

