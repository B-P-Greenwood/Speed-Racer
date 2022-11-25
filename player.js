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
    this.speed = 5;
    this.maxSpeed = 10;
  }
  update(input, deltaTime) {
    //this.checkCollision();
    //horizontal movement
    if (input.includes('ArrowRight')) this.x += this.speed;
    else if (input.includes('ArrowLeft')) this.x -= this.speed;
    //keeps car in game screen
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //vertical movement (lane change)
    if (input.includes('ArrowUp')) this.y -= this.laneWidth;
    else if (input.includes('ArrowDown')) this.y += this.laneWidth;
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
  checkCollision() {}
}
