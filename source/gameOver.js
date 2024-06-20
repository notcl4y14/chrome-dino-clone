function gameOver () {
	isGameOver = true;
	speedMultiplier = 0;
	updateScore = false;
	obstacleEnabled = false;
	pl.canMove = false;
	pl.canControl = false;

	if (stats.score > stats.highScore) {
		stats.highScore = stats.score;
	}
}