class Collision {
	constructor () {
		this.keys = [];
		this.objects = [];
	}

	addObject (obj) {
		this.objects.push(obj);
	}

	removeObj (obj) {
		let index = this.objects.indexOf(obj);
		this.objects.splice(index, 1);
	}

	hasObject (obj) {
		return this.objects.includes(obj);
	}

	hasKey (keyName) {
		return this.keys.includes(keyName);
	}
}

// https://love2d.org/wiki/BoundingBox.lua
function collision (pos1, dim1, pos2, dim2) {
	return pos1.x < pos2.x + dim2.width &&
	       pos2.x < pos1.x + dim1.width &&
		   pos1.y < pos2.y + dim2.height &&
	       pos2.y < pos1.y + dim1.height;
}

function updateCollisions (obj, arrOther) {
	const objCol = obj.col;
	for (let i = 0; i < arrOther.length; i++) {
		const other = arrOther[i];

		// if (obj === other) {
		// 	continue;
		// }

		const pos1 = {x: obj.x, y: obj.y};
		const pos2 = {x: other.x, y: other.y};
		const dim1 = {width: obj.width, height: obj.height};
		const dim2 = {width: other.width, height: other.height};

		const hasColObj = objCol.hasObject(other);
		const inCollision = collision (pos1, dim1, pos2, dim2);

		let mode = 0;
		
		if (!hasColObj && inCollision) {
			mode = 1;
		} else if (hasColObj && !inCollision) {
			mode = 2;
		}

		switch (mode) {
			case 1:
				objCol.addObject(other);
				obj.onColEnter(other);
				break;
			case 2:
				objCol.removeObj(other);
				obj.onColLeave(other);
				break;
		}
	}
}