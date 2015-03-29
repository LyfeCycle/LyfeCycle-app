function MapComponentController(){
	this.currentPolyline;
	this.currentPolylineStringList;
	this.currentLocationAnnotation;
	this.destinationLocationAnnotation;
};

MapComponentController.prototype.showCurrentLocation = function(){
	console.log("Current place: " +  gpsLocationController.getCurrentLatitude() + " " + gpsLocationController.getCurrentLongitude());
	if (gpsLocationController.getCurrentLatitude() && gpsLocationController.getCurrentLongitude()) {
		directionView.mapComponent.view.setLocation({
	        animate : true,
	        latitude: gpsLocationController.getCurrentLatitude(),
	        longitude: gpsLocationController.getCurrentLongitude(),
	        latitudeDelta: 1,
	        longitudeDelta: 1
	    });
	}
};

MapComponentController.prototype.setNewDelta = function(steps){
	var end_location = steps[steps.length-1];
	var ltDiff = Math.abs(end_location.latitude - gpsLocationController.getCurrentLatitude());
	var lgDiff = Math.abs(end_location.longitude - gpsLocationController.getCurrentLongitude());
	var delta = ltDiff > lgDiff ? ltDiff: lgDiff;
	directionView.mapComponent.view.setLocation({
        animate : true,
        latitude: (end_location.latitude + gpsLocationController.getCurrentLatitude())/2,
        longitude: (end_location.longitude + gpsLocationController.getCurrentLongitude())/2,
        latitudeDelta: delta*1.7,
        longitudeDelta: delta*1.7
    });
};

MapComponentController.prototype.setPolyline = function(steps){
	this.currentPolylineStringList = steps['polyline_route'];
	this.currentPolyline = MapModule.createRoute({points: steps['polyline_route'], color: 'blue', width: 4});
	directionView.mapComponent.view.addRoute(this.currentPolyline);
};

MapComponentController.prototype.removePolyline = function(){
	if (this.currentPolyline) directionView.mapComponent.view.removeRoute(this.currentPolyline);
	this.currentPolyline = null;
	this.currentPolylineStringList = null;
}

MapComponentController.prototype.setRouteAnnotations = function(steps){
	this.removeRouteAnnotations();
	var end_location = steps['steps'][steps['steps'].length-1];
	this.currentLocationAnnotation = MapModule.createAnnotation({
		latitude: gpsLocationController.getCurrentLatitude(),
		longitude: gpsLocationController.getCurrentLongitude(),
		title: "Current Location",
		pincolor: MapModule.ANNOTATION_PURPLE,
		animate: true
	});
	this.destinationLocationAnnotation = MapModule.createAnnotation({
		latitude: end_location.latitude,
		longitude: end_location.longitude,
		title: steps['end_destination_text'],
		pincolor: MapModule.ANNOTATION_PURPLE,
		animate: true
	});
	directionView.mapComponent.view.addAnnotation(this.currentLocationAnnotation);
	directionView.mapComponent.view.addAnnotation(this.destinationLocationAnnotation);
};

MapComponentController.prototype.removeRouteAnnotations = function(){
	if (this.currentLocationAnnotation) directionView.mapComponent.view.removeAnnotation(this.currentLocationAnnotation);
	if (this.destinationLocationAnnotation) directionView.mapComponent.view.removeAnnotation(this.destinationLocationAnnotation);
};

MapComponentController.prototype.minimizeMapComponent = function(){
	directionView.mapComponent.view.animate(Ti.UI.createAnimation({
		height: 200, duration: 100
	}));
};

MapComponentController.prototype.maximizeMapComponent = function(){
	directionView.mapComponent.view.animate(Ti.UI.createAnimation({
		height: Constants.deviceHeight, duration: 100
	}));
};

module.exports = MapComponentController;