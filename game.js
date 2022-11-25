import { InputHandler } from './playerInput.js';
import { Player } from './player.js';
import { WhiteCar } from './vehicle.js';

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('game-frame');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.margin = 20;
      this.speed = 0;
      this.maxSpeed = 5;
      //background
      this.player = new Player(this);
      this.input = new InputHandler(this);
      //vehicles
      this.vehicles = [];
      this.vehicleTimer = 0;
      this.vehicleInterval = 1000;
      this.score = 0;
    }
    update(deltaTime) {
      this.player.update(this.input.keys, deltaTime);
      if (this.vehicleTimer > this.vehicleInterval) {
        this.addVehicle();
        this.vehicleTimer = 0;
      } else {
        this.vehicleTimer += deltaTime;
      }
      this.vehicles.forEach((vehicle) => {
        vehicle.update(deltaTime);
        if (vehicle.markedForDeletion) {
          this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);
        }
      });
    }
    draw(context) {
      this.player.draw(context);
      this.vehicles.forEach((vehicle) => {
        vehicle.draw(context);
      });
    }
    addVehicle() {
      this.vehicles.push(new WhiteCar(this));
      console.log(this.vehicles);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
