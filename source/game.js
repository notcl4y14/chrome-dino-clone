let pl = new Player();

pl.x = 50;
pl.y = 400;
pl.width = 50;
pl.height = 50;

let scoreCap = new ScoreCap();
let obstacles = [];
let speedMultiplier = 5;
let updateScore = true;
let isGameOver = false;

// obstacles.push(new Cactus());
// obstacles[0].x = window.innerWidth;
// obstacles[0].y = options.groundY;

let Game = function () {
	this.isRunning = false;
	this.ticks = 0;

	// ===================== //

	this.start = function () {
		this.isRunning = true;
		window.requestAnimationFrame(() => this.loop.call(this));
	};

	this.stop = function () {
		this.isRunning = false;
	};

	// ===================== //

	// An alternative to loop() that's called once
	this.tick = function (times = 1) {
		for (let i = 0; i < times; i++) {
			this.update();
			this.draw();
		}
	}

	// ===================== //

	this.loop = function () {
		if (!this.isRunning) return;

		this.update();
		this.draw();

		window.requestAnimationFrame(() => this.loop.call(this));
	};

	// ===================== //

	this.update = function () {
		if (isGameOver) {
			let keyR = Input.isKeyDown("KeyR");

			if (keyR) {
				pl = new Player();

				pl.x = 50;
				pl.y = 400;
				pl.width = 50;
				pl.height = 50;

				scoreCap = new ScoreCap();
				obstacles = [];
				speedMultiplier = 5;
				updateScore = true;
				obstacleEnabled = true;
				isGameOver = false;

				stats.score = 0;

				// obstacles.push(new Cactus());
				// obstacles[0].x = window.innerWidth;
				// obstacles[0].y = options.groundY;
			}
		}

		if (updateScore) {
			stats.score += 0.25 / 1.5;
		}

		if (Math.floor(stats.score) != 0 && Math.floor(stats.score) % 100 == 0) {
			speedMultiplier += 0.25;
			scoreCap.score = Math.floor(stats.score);
			scoreCap.show();
		}

		scoreCap.update();

		updateObstacle();
		updateCollisions(pl, obstacles);
		pl.update();

		for (let obstacle of obstacles) {
			obstacle.update();
		}
	};

	this.draw = function () {
		context.fillStyle = options.bgColor;
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.strokeStyle = "#101010";
		context.strokeLine(
			0,
			options.groundY + 0.5,
			canvas.width,
			options.groundY + 0.5
		);

		context.fillStyle = "#101010";
		context.save();
		context.textBaseline = "top";
		context.textAlign = "right";
		context.font = "20px Math";
		context.fillText(Math.floor(stats.score), canvas.width, 0);
		context.restore();

		for (let obstacle of obstacles) {
			obstacle.draw();
		}

		pl.draw();

		scoreCap.draw();

		if (isGameOver) {
			let centerX = canvas.width / 2;
			let centerY = canvas.height / 2;

			context.fillStyle = "#101010";
			context.save();
			context.textBaseline = "middle";
			context.textAlign = "center";
			context.font = "20px Math";
			context.fillText("Game Over", centerX, centerY);
			context.font = "15px Math";
			context.fillText("Press R to try again", centerX, centerY + 20);
			context.restore();
		}

		// context.beginPath();
		// context.moveTo(0, options.groundY + 0.5);
		// context.lineTo(canvas.width, options.groundY + 0.5);
		// context.closePath();
		// context.stroke();
	};
}