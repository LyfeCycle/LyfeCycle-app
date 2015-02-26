// This controllers everything that occurs in the direction view	

function DirectionController(){

};

DirectionController.prototype.setUserPin = function(){
	var coordinates = gpsLocationController.getCurrentCoordinates();
	directionView.addPinToMap(coordinates, 'userPin', '/images/user.png');
};

DirectionController.prototype.getDirections = function(endLocation) {
	var requestURL =  Constants.GoogleDirectionsStartReq + gpsLocationController.getCurrentLatitude() + ',' 
					+ gpsLocationController.getCurrentLongitude() + '&destination=' + endLocation + Constants.GoogleDirectionsEndReq;	  

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			console.log("GOT RESPONSE");
		 // self.addRouteToMap(self.parseJSONtoRoute(this.responseText, this.destination_point));
		 // listDirectionsController.putDirectionsInList(this.responseText);
		},
		onerror : function(e) {
			console.log("NO RESPONSE FAIL");
		},
		timeout : 10000
	 });

	// Send request
	client.open("GET", encodeURI(requestURL));
	client.send();
};	

module.exports = DirectionController;