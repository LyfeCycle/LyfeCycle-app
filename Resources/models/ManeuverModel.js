module.exports.IMAGES = {
	'turn-right': '/images/maneuvers/right-turn.png',
	'turn-slight-right': '/images/maneuvers/right-slight.png',
	'turn-left': '/images/maneuvers/left-turn.png',
	'turn-slight-left': '/images/maneuvers/left-slight.png'
};

module.exports.validType = function(maneuver) {
	for (var key in module.exports.IMAGES) if (maneuver === key) return true;
	return false;
};