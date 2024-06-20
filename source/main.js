let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let game = new Game();
// let options = new Options();

function fillCanvasToWindow () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

// ===================== //

window.onload = () => {
	loadContext(context);
	fillCanvasToWindow();

	game.start();
};

window.onresize = () => {
	fillCanvasToWindow();
};

window.onkeydown = (key) => {
	Input.press(key.code);

	switch (key.code) {
		case "F2":
			stats.score = 100;
			break;
	}
};

window.onkeyup = (key) => {
	Input.unpress(key.code);
};