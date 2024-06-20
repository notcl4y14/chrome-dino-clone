let obstacleObjs = [];
let obstacleEnabled = true;
let obstacleTimer = 10;
let obstacleTimerMin = 10;
let obstacleTimerMax = 100;

function addRandomObstacle () {
	const rand = Math.floor(Math.random() * obstacleObjs.length);
	const obstacle = obstacleObjs[rand];
	const index = obstacles.push(new obstacle()) - 1;

	obstacles[index].x = canvas.width;
	obstacles[index].y = options.groundY;
}

function getObstacleTimer () {
	return {
		min: obstacleTimerMin * (speedMultiplier / 4),
		max: obstacleTimerMax * (speedMultiplier / 4)
	};
}

function updateObstacle () {
	if (!obstacleEnabled) return;
	
	obstacleTimer--;

	if (obstacleTimer < 0) {
		const timer = getObstacleTimer();
		obstacleTimer = Math.floor(Math.random() * (timer.max - timer.min) + timer.min);
		addRandomObstacle();
	}
}