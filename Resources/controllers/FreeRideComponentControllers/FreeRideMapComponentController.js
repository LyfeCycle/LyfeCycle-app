function FreeRideMapComponentController(){
	this.currentPolyline;
};

FreeRideMapComponentController.prototype.showCurrentLocation = function(){
	console.log("Current place: " +  gpsLocationController.getCurrentLatitude() + " " + gpsLocationController.getCurrentLongitude());
	if (gpsLocationController.getCurrentLatitude() && gpsLocationController.getCurrentLongitude()) {
		freeRideView.freeRideMapComponent.view.setLocation({
	        animate : true,
	        latitude: gpsLocationController.getCurrentLatitude(),
	        longitude: gpsLocationController.getCurrentLongitude(),
	        latitudeDelta: 1,
	        longitudeDelta: 1
	    });
	}
};

FreeRideMapComponentController.prototype.addIncident = function(incident){
	var annotation = MapModule.createAnnotation({
		latitude: incident.latitude,
		longitude: incident.longitude,
		image: IncidentTypeModel.IMAGES[incident.tag]
	});
	freeRideView.freeRideMapComponent.view.addAnnotation(annotation);
};

FreeRideMapComponentController.prototype.addPolyline = function(polyline){
	if (this.currentPolyline) freeRideView.freeRideMapComponent.view.removeRoute(this.currentPolyline);
	this.currentPolyline = polyline;
	freeRideView.freeRideMapComponent.view.addRoute(this.currentPolyline);
};

FreeRideMapComponentController.prototype.removePolyline = function(){
	if (this.currentPolyline) freeRideView.freeRideMapComponent.view.removeRoute(this.currentPolyline);
	this.currentPolyline = null;
};

FreeRideMapComponentController.prototype.addCurrentReportedIncidentToMap = function(key, source){

	var incident = Ti.UI.createView({
		height: 52,
		bottom: '100%',
		id: key
	});

	var img = Ti.UI.createImageView({
		id: key,
		image: IncidentTypeModel.IMAGES[key],
		height: '90%'
	});

	var arrow = Ti.UI.createImageView({
		image: 'images/arrow_down.png',
		height: 30,
		bottom: 0
	});

	var circle = Ti.UI.createView({
		height: 34,
		width: 34,
		backgroundColor: 'yellow',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 17,
		top: 0
	});

	circle.add(img);
	incident.add(arrow);
	incident.add(circle);

	freeRideView.freeRideMapComponent.view.add(incident);

	// Animations
	incident.animate(
		Ti.UI.createAnimation({
			duration: 150,
			top: source.y - Constants.deviceHeight*0.11,
			left: 40
		})
	);
	return incident;
};

module.exports = FreeRideMapComponentController;