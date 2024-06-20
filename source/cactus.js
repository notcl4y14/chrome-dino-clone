class Cactus extends Entity {
	constructor () {
		super();
		this.x = 0;
		this.y = 0;
		this.width = 50;
		this.height = 50;
		this.velX = 0;
		this.velY = 0;
		this.sprite = null;
	}

	// ===================== //

	update () {
		this.x -= 1 * speedMultiplier;
		this.y = options.groundY - this.height;

		if (this.getBBoxSide("right") < 0) {
			let index = obstacles.indexOf(this);
			obstacles.splice(index, 1);
		}
	}

	draw () {
		this.drawBoundingBox();
	}
}

obstacleObjs.push(Cactus);