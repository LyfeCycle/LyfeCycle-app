// This Controller stores the information for each current route to the Ti App Properties. 
// This is the actual handler for every route, and abstracts it from any UI components
var BackgroundRouteController = require('/controllers/RouteControllers/BackgroundRouteController');

function RouteController(){
	this.routeEndLocation;
	this.routeDuration;

	// Set all intial values to empty
	Ti.App.Properties.setBool('currentRide', false);
	Ti.App.Properties.setDouble('endLat', 0);
	Ti.App.Properties.setDouble('endLong', 0);
	Ti.App.Properties.setObject('timeStarted', null);
	Ti.App.Properties.setObject('timeEndPredicted', null);
};

// This is the info for a potential route - it's from when the directions are initially got, an this waits for 
// the start of the route to be confirmed
RouteController.prototype.prepRoute = function(routeJson){
	this.routeDuration = routeJson.duration.value;
	this.routeEndLocation  = routeJson.end_location;
};

RouteController.prototype.startRoute = function(){
	var startTime = new Date(), endTime = new Date(startTime.getSeconds() + this.routeDuration);
	Ti.App.Properties.setBool('currentRide', true);
	Ti.App.Properties.setDouble('endLat', this.routeEndLocation.lat);
	Ti.App.Properties.setDouble('endLong', this.routeEndLocation.lng);
	Ti.App.Properties.setObject('timeStarted', startTime);
	Ti.App.Properties.setObject('timeEndPredicted', endTime);
};

RouteController.prototype.endRoute = function(){
	Ti.App.Properties.setBool('currentRide', false);
	Ti.App.Properties.setDouble('endLat', 0);
	Ti.App.Properties.setDouble('startLat', 0);
	Ti.App.Properties.setObject('timeStarted', null);
	Ti.App.Properties.setObject('timeEndPredicted', null);
};

RouteController.prototype.checkIfUserIsAtEndLocation = function(){
	gpsLocationController.getCurrentLatitude();
	gpsLocationController.getCurrentLongitude();
};

module.exports = RouteController;