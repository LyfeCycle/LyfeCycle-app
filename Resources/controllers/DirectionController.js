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
	// SHOULD BE MOVED TO THE BACKEND
		// To send to the backend, will send current location (long & lat) along with desination (will be an address string)
		// From the API we should receive the directions, and any incidents that might occur along each step of the route
	var requestURL = "http://lyfecycle-api.herokuapp.com/locations/directions?startLat=" + 
		gpsLocationController.getCurrentLatitude() + "&startLong=" + 
		gpsLocationController.getCurrentLongitude() + "&destination=" + endLocation;
	console.log("REQUEST URL");
	console.log(encodeURI(requestURL));
	// Request & callbacks
	var client = Ti.Network.createHTTPClient({
		onload: function(e) { addDirectionsToComponents(JSON.parse(this.responseText), endLocation); },
		onerror: function(e) { alert("Could not get directions. Try again soon!"); }, timeout : 10000
	 });
	client.open("GET", encodeURI(requestURL)); client.send();

	// ALL HELPER FUNCTIONS
		function addDirectionsToComponents(json, endLocation) {
			try {
				var jsonSteps = json[0]['legs'][0]['steps'], steps = [], polyline = [];
				for (i in jsonSteps) {
					// console.log(jsonSteps[i]);
					directionView.mapComponent.decodePolyline(jsonSteps[i]['polyline']['points'], polyline);
					steps.push(StepModel.validStep(jsonSteps[i]));
				}
				addDirectionsToMapComponent({'steps':steps, 'end_destination_text': endLocation, 'polyline_route': polyline});
				addDirectionsToRouteListComponent({'steps':steps, 'end_destination_text': endLocation, 'polyline_route': polyline});
				addDirectionsToRouteController(json[0]['legs'][0]);
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

		function addDirectionsToRouteController(jsonInfo){
			routeController.prepRoute(jsonInfo);
		}
};

DirectionController.prototype.showCurrentLocation = function(){
	this.mapComponentController.showCurrentLocation();
};

module.exports = DirectionController;