const MovingObject = require("./moving_object");
const Bullet = require("./bullet");
const Util = require("./util");

class Ship extends MovingObject {
  constructor(options) {
    super(options);
    this.radius = Ship.RADIUS;
    this.vel = options.vel || [0, 0];
    this.pos = options.pos;
    this.image = new Image();
    this.score = 0;
    this.stars = document.getElementById("stars");
    this.lose = document.getElementById("lose");
    switch (options.color) {
      case "red":
        this.image.src = "./image/PNG/ufoRed.png";
        break;
      case "blue":
        this.image.src = "./image/PNG/ufoBlue.png";
        break;
      default:
        this.image.src = "./image/PNG/ufoRed.png";
    }
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      this.vel = [-this.vel[0], -this.vel[1]];
      otherObject.vel = [-otherObject.vel[0], -otherObject.vel[1]];
    } else if (otherObject instanceof Bullet) {
      if (otherObject.shooter !== this) {
        this.health = 0;
        otherObject.shooter.score += 1;
        this.relocate();
      }
      otherObject.remove();
    } else if (otherObject instanceof Asteroid) {
      otherObject.vel = [-otherObject.vel[0], -otherObject.vel[1]];
      this.vel = [-this.vel[0], -this.vel[1]];
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.pos[0] - this.radius,
      this.pos[1] - this.radius,
      30,
      30
    );
  }

  fireBullet() {
    const norm = Util.norm(this.vel);

    if (norm == 0) {
      return;
    }

    const relVel = Util.scale(Util.dir(this.vel), Bullet.SPEED);

    const bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

    let xCoord = this.pos[0] + this.vel[0];
    let yCoord = this.pos[1] + this.vel[1];

    const bullet = new Bullet({
      pos: [xCoord, yCoord],
      vel: bulletVel,
      game: this.game,
      shooter: this
    });

   while (bullet.health > 0 && this.collidedDistance(bullet) > 0) {
      bullet.move(44);
    }

    this.game.add(bullet);
    this.stars.play();
  }

  power(impulse) {
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
    this.lose.play();
  }
}

Ship.RADIUS = 15;
module.exports = Ship;
