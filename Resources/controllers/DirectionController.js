// This controllers everything that occurs in the direction view	

function DirectionController(){

};

DirectionController.prototype.setUserPin = function(){
	var coordinates = gpsLocationController.getCurrentCoordinates();
	directionView.addPinToMap(coordinates);
};

DirectionController.prototype.getDirections = function(endLocation) {
	// This content will be eventually transferred to the backend
};	

module.exports = DirectionController;