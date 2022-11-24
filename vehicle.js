class Vehicle {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
  }
  update(deltaTime) {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    //remove off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class WhiteCar extends Vehicle {
  constructor(game) {
    super();
    this.game = game;
    this.width = 110;
    this.height = 70;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = document.getElementById('vehicle.png');
    this.speedX = 0;
    this.speedY = 0;
  }
}
