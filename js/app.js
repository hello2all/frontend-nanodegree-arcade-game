// Enemies our player must avoid
var Enemy = function() {
    this.x = -101;
    this.row = Math.floor((Math.random() * 3) + 1); // random row
    this.y = this.row * 83 - 20;
    this.speed = Math.floor((Math.random() * 100) + 50);; // Generate speed between 50 - 100
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if(this.x > 505)
    {
        // // respown at a random row once out of the frame
        this.x = -101;
        this.row = Math.floor((Math.random() * 3) + 1); // respown at a random row
        this.y = this.row * 83 - 20;
    }
    // collision: collide if the player is inside a 50*40 box based on the enemy's position
    if((player.x > (this.x - 50) && player.x < (this.x + 50)) && (player.y > (this.y -40) && (player.y < (this.y + 40))))
    {
        player.init();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(){
    this.direction = -1;  // filtered key direction
    this.stepX = 101;  // horizontal moving step gap
    this.stepY = 83;  // vertical moving step gap
    this.sprite = 'images/char-boy.png';

};

// handleInput method, filter out movements lead to getting out of frame
Player.prototype.handleInput = function(key) {
    if(key == 'left' && this.x > 0){
        this.direction = 1;
    }
    else if(key == 'up' && this.y > 0){
        this.direction = 2;
    }
    else if(key == 'right' && this.x < 404){
        this.direction = 3;
    }
    else if(key == 'down' && this.y < 390){
        this.direction = 4;
    }
    else {
      this.direction = -1;
    }
};


Player.prototype.update = function() {
    if(this.direction != -1){
        if(this.direction == 1){
            this.x = this.x - this.stepX;
            this.direction = -1;
        }

        else if(this.direction == 2){
            this.y = this.y - this.stepY ;
            this.direction = -1;
        }

        else if(this.direction == 3){
            this.x = this.x + this.stepX;
            this.direction = -1;
        }

        else if(this.direction == 4){
            this.y = this.y + this.stepY ;
            this.direction = -1;
        }
        else {
            console.log('Player.prototype.update error');
        }
    }
    // respown at starting postion once reach water
    if (this.y < 0){
      this.init()
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Initiate the game by putting player back to starting position
Player.prototype.init = function() {
    this.x = 202;
    this.y = 390;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var NoEnmy = Math.floor((Math.random() * 10) + 3);
for (var i = 0; i < NoEnmy; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();



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
