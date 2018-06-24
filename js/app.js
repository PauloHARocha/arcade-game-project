// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    constructor(){
        this.initialX = -80;
        this.x = this.initialX;
        this.y = this.initPosition();
        this.speed = this.initSpeed();
        this.sprite = 'images/enemy-bug.png';
    };
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += Math.floor(this.speed*dt);
        if (this.x > ctx.canvas.width)
            this.reset();
    };

    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    initSpeed(){
        let velocity = [200, 300, 400];//The speeds the bug can have
        return velocity[Math.floor(Math.random() * 3)]
    };

    initPosition(){
        let position = [51, 134, 217];//The initial lanes
        return position[Math.floor(Math.random() * 3)]
    };

    reset(){//Initialize the bug on a new lane with a new speed
        this.x = this.initialX;
        this.y = this.initPosition();
        this.speed = this.initSpeed();
    }

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(){
        this.initialX = 202;
        this.initialY = 383;
        this.x = this.initialX;
        this.y = this.initialY;
        this.nextMove = [this.x, this.y];
        this.sprite = 'images/char-boy.png';
        this.reachWater = false; 
        this.score = 0;
        this.lives = 3;
        this.timer = true;
    };

    init(colision){//Player comes back to inital position
        this.x = this.initialX;
        this.y = this.initialY;
        this.nextMove = [this.x, this.y];
        if(colision){//If was a colision with a bug the player lose a live
            this.lives -= 1;
            if(!this.lives){//restart the game
                this.lives = 3
                this.score = 0;
                this.timer = false; //used to restart the clock on engine.js
            }
        }
        else{//if reaches the water scores 100 points
            this.reachWater = false;
            this.score += 100;
        }
    };

    update(){
        if (this.reachWater){//If reaches the water goes back to inital position
            this.init(false);
        }
        else{// update position
            this.x = this.nextMove[0];
            this.y = this.nextMove[1];
        }
    };

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    handleInput(key){
        if(key != undefined){
            var movements = {
                'left': [-101, 0],
                'up': [0, -83],
                'right': [101, 0],
                'down': [0, 83]
            };
            var borders = {
                left: 0,
                up: 51,
                right: ctx.canvas.width - 1,
                down: 383
            }//Logic to make sure the player dont acess a position outside the game board
            if (this.x + movements[key][0] <= borders.right 
                && this.x + movements[key][0] >= borders.left)
                this.nextMove[0] += movements[key][0];
            // Logic to verify if the player reach the water
            if (this.y + movements[key][1] < borders.up)
                this.reachWater = true; 
        
            if (this.y + movements[key][1] <= borders.down 
                && this.y + movements[key][1] >= borders.up)
                this.nextMove[1] += movements[key][1];
            
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [new Enemy(), new Enemy(), new Enemy()];
player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
