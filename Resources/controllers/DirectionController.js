// This controllers everything that occurs in the direction view	
var MapComponentController = require('/controllers/DirectionComponentControllers/MapComponentController');
var RouteListComponentController = require('/controllers/DirectionComponentControllers/RouteListComponentController');

function DirectionController(){
	this.mapComponentController = new MapComponentController();
	this.routeListComponentController = new RouteListComponentController();
};

DirectionController.prototype.setUserPin = function(){
	var coordinates = gpsLocationController.getCurrentCoordinates();
	directionView.addPinToMap(coordinates, 'userPin', '/images/user.png');
};

DirectionController.prototype.getDirections = function(endLocation) {
	var self = this;
	var requestURL =  Constants.GoogleDirectionsStartReq + gpsLocationController.getCurrentLatitude() + ',' 
					+ gpsLocationController.getCurrentLongitude() + '&destination=' + endLocation + Constants.GoogleDirectionsEndReq;	  

	var client = Ti.Network.createHTTPClient({
		onload: function(e) { addDirectionsToComponents(JSON.parse(this.responseText), endLocation); },
		onerror: function(e) { alert("Could not get directions. Try again soon!"); }, timeout : 10000
	 });
	client.open("GET", encodeURI(requestURL)); client.send();

	function addDirectionsToComponents(json, endLocation) {
		try {
			var jsonSteps = json['routes'][0]['legs'][0]['steps'], steps = [], polyline = [];
			for (i in jsonSteps) {
				directionView.mapComponent.decodePolyline(jsonSteps[i]['polyline']['points'], polyline);
				steps.push(StepModel.validStep(jsonSteps[i]));
			}
			addDirectionsToMapComponent({'steps':steps, 'end_destination_text': endLocation, 'polyline_route': polyline});
			addDirectionsToRouteListComponent({'steps':steps, 'end_destination_text': endLocation, 'polyline_route': polyline});
		} catch(err) { alert("Could not get location! "); console.log(err); };
	};

	function addDirectionsToMapComponent(stepsObject){
		self.mapComponentController.setPolyline(stepsObject);
		self.mapComponentController.setNewDelta(stepsObject['steps']);
		self.mapComponentController.setRouteAnnotations(stepsObject);
	};

	function addDirectionsToRouteListComponent(stepsObject){
		self.routeListComponentController.showList(stepsObject);
	};
};

DirectionController.prototype.showCurrentLocation = function(){
	this.mapComponentController.showCurrentLocation();
};

module.exports = DirectionController;