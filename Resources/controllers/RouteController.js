// This Controller stores the information for each current route to the Ti App Properties. 
// This is the actual handler for every route, and abstracts it from any UI components
// Calculations from this crappy article: http://classroom.synonym.com/convert-latitude-longtitude-feet-2724.html

function RouteController(){
	this.routeEndLocation;
	this.routeDuration;
	this.milage;
	this.currentRide = false;
	this.endLatitudeRange = 0.00082307035;
	this.endLongitudeRange = 0.00082308541;

	// Set all intial values to empty
	Ti.App.Properties.setBool('currentRide', false);
	Ti.App.Properties.setDouble('endLat', 0);
	Ti.App.Properties.setDouble('endLong', 0);
	Ti.App.Properties.setObject('timeStarted', null);
	Ti.App.Properties.setObject('timeEndPredicted', null);
	Ti.App.Properties.setObject('timeEndActual', null);
	Ti.App.Properties.setList('polyline', []);
	Ti.App.Properties.setBool('completedRide', false);

};

// This is the info for a potential route - it's from when the directions are initially got, an this waits for 
// the start of the route to be confirmed
RouteController.prototype.prepRoute = function(routeJson){
	this.milage = routeJson.distance.value;
	this.routeDuration = routeJson.duration.value;
	this.routeEndLocation = routeJson.end_location;
};

RouteController.prototype.startRoute = function(){
	var startTime = new Date();
	var endTime = new Date(startTime.getTime() + this.routeDuration*1000);
	Ti.App.Properties.setBool('currentRide', true);
	Ti.App.Properties.setDouble('endLat', this.routeEndLocation.lat);
	Ti.App.Properties.setDouble('endLong', this.routeEndLocation.lng);
	Ti.App.Properties.setObject('timeStarted', startTime);
	Ti.App.Properties.setObject('timeEndPredicted', endTime);
	Ti.App.Properties.setList('polyline', directionController.mapComponentController.currentPolylineStringList);
	this.currentRide = true;
};

RouteController.prototype.endRoute = function(){
	Ti.App.Properties.setBool('currentRide', false);
	Ti.App.Properties.setDouble('endLat', 0);
	Ti.App.Properties.setDouble('startLat', 0);
	Ti.App.Properties.setObject('timeStarted', null);
	Ti.App.Properties.setObject('timeEndPredicted', null);
	Ti.App.Properties.setObject('timeEndActual', null);
	Ti.App.Properties.setList('polyline', []);
	Ti.App.Properties.setBool('completedRide', false);
	this.routeEndLocation = false;
	this.currentRide = false;
	this.sendMilage();
};

RouteController.prototype.sendMilage = function() {
	userClient.sendMilage(this.milage, function () {
		this.milage = 0;
	});
}

RouteController.prototype.checkIfUserIsAtEndLocation = function(){
	if (this.currentRide) {	
		if (Math.abs(gpsLocationController.getCurrentLatitude()-this.routeEndLocation.lat) > this.endLatitudeRange) 
			return false;
		else if (Math.abs(gpsLocationController.getCurrentLongitude()-this.routeEndLocation.lng) > this.endLongitudeRange)
			return false;
		else 
			return true;
	} else return false;
};

module.exports = RouteController;