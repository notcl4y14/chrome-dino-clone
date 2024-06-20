class Player extends Entity {
	constructor (x, y) {
		super();
		this.width = 50;
		this.height = 50;

		this.jumpPower = -10;
		this.canControl = true;
	}

	// ===================== //

	get isOnFloor () {
		return this.getBBoxSide("bottom") >= options.groundY;
	}

	// ===================== //

	update () {
		let keyJump = Input.isKeyDown("Space", "KeyW", "ArrowUp");
		let keyDuck = Input.isKeyDown("LeftShift", "KeyS", "ArrowDown");

		if (keyJump && this.isOnFloor && this.canControl) {
			this.velY = this.jumpPower;
		}

		if (keyDuck && this.canControl) {
			this.y += 25
			this.height = 25;
			this.velY += 0.25;
		} else {
			this.height = 50;
		}

		this.applyGravity(options.gravity);
		this.applyVelocity();

		if (this.isOnFloor) {
			this.stopVelocity();
			this.y = options.groundY - this.height;
		}
	}

	// ===================== //

	onColEnter (other) {
		gameOver();
		// speedMultiplier = 0;
		// updateScore = false;
		// obstacleEnabled = false;
		// // isGameOver = true;
		// this.canMove = false;
		// this.canControl = false;
	}
}