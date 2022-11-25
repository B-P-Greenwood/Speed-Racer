export class Player {
  constructor(game) {
    this.game = game;
    this.width = 119;
    this.height = 69;
    this.x = 0;
    this.laneWidth = 10;
    this.y = this.game.height / 2;
    this.frameX = 0;
    this.frameY = 0;
    this.image = document.getElementById('player');
    this.speed = 0;
    this.maxSpeed = 15;
    this.serveSpeed = 0;
    this.maxServe = 7;
  }
  update(input, deltaTime) {
    //this.checkCollision();
    //horizontal movement
    if (input.includes('ArrowRight') && this.speed < this.maxSpeed)
      this.speed++;
    else if (input.includes('ArrowLeft') && this.speed > -this.maxSpeed)
      this.speed -= 2;
    else if (!input.includes('ArrowRight') && this.speed > 0) this.speed--;
    else if (!input.includes('ArrowLeft') && this.speed < 0) this.speed++;
    //keeps car in game screen
    //within width
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //within height
    if (this.y < 0) {
      this.y = 0;
      this.serveSpeed = 0;
    }
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height;
      this.serveSpeed = 0;
    }
    //vertical movement (lane change)
    if (input.includes('ArrowUp') && this.serveSpeed > -this.maxServe) {
      this.serveSpeed -= 0.4;
    } else if (input.includes('ArrowDown') && this.serveSpeed < this.maxServe) {
      this.serveSpeed += 0.4;
    }
    this.y += this.serveSpeed;
    this.x += this.speed;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  checkCollision() {
    this.game.vehicles.forEach((vehicle) => {
      if (
        vehicle.x < this.x + this.width &&
        vehicle.x + vehicle.width > this.x &&
        vehicle.y < this.y + this.height &&
        vehicle.y + vehicle.height > this.y
      ) {
        //collision detected
        vehicle.markedForDeletion = true;
        this.game.score++;
      } else {
        // no collision
      }
    });
  }
}
