function IncidentController(){
	// These will always be the longitude delta
	this.prevFreeRideDelta = 0;
	this.prevDirectionDelta = 0;

	this.clusteringTolerance = 0.02;
	this.allIncidents = [];
	this.setIncidentListener(directionView.mapComponent.view);
	this.setIncidentListener(freeRideView.freeRideMapComponent.view);
};

IncidentController.prototype.getAllIncidents = function(){
	var self = this;
	incidentClient.getAllIncidents(function (results){
		self.allIncidents = results;
	});
};

IncidentController.prototype.setIncidentListener = function(mapView){
	var self = this;
	mapView.addEventListener('regionChanged', function (evt){
		var topLat = (Math.abs(evt.latitude) + Math.abs(evt.latitudeDelta/2))*((evt.latitude > 0) ? 1 : -1);
		var bottomLat = (Math.abs(evt.latitude) - Math.abs(evt.latitudeDelta/2))*((evt.latitude > 0) ? 1 : -1);
		var leftLong = (Math.abs(evt.longitude) + Math.abs(evt.longitudeDelta/2))*((evt.longitude > 0) ? 1 : -1);
		var rightLong = (Math.abs(evt.longitude) - Math.abs(evt.longitudeDelta/2))*((evt.longitude > 0) ? 1 : -1);
		if (Math.abs(leftLong) - Math.abs(rightLong) > self.clusteringTolerance) 
			self.clusterPoints(mapView, topLat, bottomLat, leftLong, rightLong);
		else
			self.addRawAnnotations(mapView);
	});
};

IncidentController.prototype.clusterPoints = function(mapView, topLat, bottomLat, leftLong, rightLong){
	if ((mapView.id === 0 ? this.prevDirectionDelta : this.prevFreeRideDelta) > (Math.abs(leftLong) - Math.abs(rightLong))) {
		// We've zoomed in - don't get new annotations

	} else {
		mapView.id === 0 ? this.prevDirectionDelta : this.prevFreeRideDelta = Math.abs(leftLong) - Math.abs(rightLong);
		// zoomed out. Clear annotations and start again
	}
};

IncidentController.prototype.addRawAnnotations = function(mapView, topLat, bottomLat, leftLong, rightLong){
	if ((mapView.id === 0 ? this.prevDirectionDelta = Math.abs(leftLong) - Math.abs(rightLong) : this.prevFreeRideDelta) > (Math.abs(leftLong) - Math.abs(rightLong))) {
		// We've zoomed in - don't get new annotations
		
	} else {
		mapView.id === 0 ? this.prevDirectionDelta = Math.abs(leftLong) - Math.abs(rightLong) : this.prevFreeRideDelta = Math.abs(leftLong) - Math.abs(rightLong);
		// zoomed out. Clear annotations and start again
	}
};

IncidentController.prototype.pointInRegion = function(topRegion, bottomRegion, leftRegion, rightRegion){

};

module.exports = IncidentController;