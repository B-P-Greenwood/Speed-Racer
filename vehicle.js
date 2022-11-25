class Vehicle {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.markedForDeletion = false;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
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
    this.y = Math.floor(Math.random() * 4 + 1) * 100;
    this.image = document.getElementById('white');
    this.speedX = Math.random() + 3;
    this.speedY = 0;
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}
