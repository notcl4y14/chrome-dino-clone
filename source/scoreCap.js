class ScoreCap {
	constructor () {
		this.score = 0;
		this.isShown = false;
		this.delay = 200;
		this.delayedFor = 0;
	}

	// ===================== //

	show () {
		this.isShown = true;
		this.delayedFor = 0;
	}

	hide () {
		this.isShown = false;
	}

	// ===================== //

	update () {
		if (!this.isShown) {
			return
		}

		this.delayedFor++;

		if (this.delayedFor > this.delay) {
			this.hide();
		}
	}

	draw () {
		if (!this.isShown || Math.cos(this.delayedFor / 10) < 0) {
			return
		}
		
		context.fillStyle = "#101010";
		context.save();
		context.textBaseline = "top";
		context.textAlign = "right";
		context.font = "20px Math";
		context.fillText(this.score, canvas.width, 15);
		context.restore();
	}
}