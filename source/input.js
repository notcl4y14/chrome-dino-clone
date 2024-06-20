function Input () {}

Input.keys = {};

// ===================== //

Input.press = function (key) {
	this.keys[key] = true;
}

Input.unpress = function (key) {
	this.keys[key] = false;
}

// ===================== //

Input.isKeyDown = function () {
	let keys = arguments;
	let isDown = false;

	for (let key of keys) {
		if (this.keys[key]) {
			isDown = true;
			break;
		}
	}
	
	return isDown;
}

Input.isKeyUp = function (key) {
	return this.keys[key]
		? this.keys[key] == false
		: true;
}