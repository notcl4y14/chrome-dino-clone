class Entity {
	constructor () {
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.velX = 0;
		this.velY = 0;
		this.sprite = null;
		this.canMove = true;
		this.col = new Collision();
	}

	// ===================== //

	update () {
		this.applyGravity(0, 0.25);
		this.applyVelocity();

		if (this.y + this.height >= options.groundY) {
			this.stopVelocity();
			this.y = 400 - this.height;
		}
	}

	draw () {
		this.drawBoundingBox();

		if (options.velocityPrediction.enabled) {
			this.drawVelPredict();
		}
	}

	// ===================== //

	onColEnter (other) {}
	onColLeave (other) {}

	// ===================== //

	applyGravity ({x, y}) {
		if (!this.canMove) return;
		this.velX += x;
		this.velY += y;
	}

	applyVelocity () {
		if (!this.canMove) return;
		this.x += this.velX;
		this.y += this.velY;
	}

	stopVelocity () {
		this.velX = 0;
		this.velY = 0;
	}

	// ===================== //

	getBBoxSide (side) {
		switch (side) {
			case "left":
				return this.x;
			case "right":
				return this.x + this.width;
			case "top":
				return this.y;
			case "bottom":
				return this.y + this.height;
			default:
				return undefined;
		}
	}

	// ===================== //

	drawSprite () {
		if (!this.sprite ||
			!this.sprite.complete ||
			this.sprite.width == 0
		) return;

		context.drawImage(this.sprite, this.x, this.y);
	}

	drawBoundingBox () {
		context.strokeStyle = "#000000";
		context.strokeRect(this.x + 0.5, this.y + 0.5, this.width, this.height);

		context.fillStyle = "#000000";
		context.fillText(`${this.x}; ${this.y}`, this.x, this.y);
	}

	drawVelPredict () {
		context.strokeStyle = `rgba(0,0,0,${options.velocityPrediction.opacity})`;
		context.strokeRect(this.x + 0.5 + this.velX, this.y + 0.5 + this.velY, this.width, this.height);
	}
}