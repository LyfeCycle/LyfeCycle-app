function FreeRideController(){
	this.currentIncident = null;
	this.currentIncidentKey = null;
	this.currentIncidentCoordinates = null;

	var self = this;
	// Set up event listener for the FreeRide map view
	freeRideView.reportMapComponent.view.addEventListener('longpress', function (source){		
		if (self.currentIncidentKey) {
			self.currentIncident = freeRideView.reportMapComponent.addCurrentReportedIncidentToMap(self.currentIncidentKey, source);
			self.currentIncidentCoordinates = getMapCoordinates(source.x, source.y);
		}
	});

	function getMapCoordinates(x, y) {
		var region = freeRideView.reportMapComponent.view.actualRegion || freeRideView.reportMapComponent.view.region;
	    var widthInPixels = freeRideView.reportMapComponent.view.rect.width;
	    var heightInPixels = freeRideView.reportMapComponent.view.rect.height;
	    // should invert because of the pixel reference frame
	    heightDegPerPixel = -region.latitudeDelta / heightInPixels; 
	    widthDegPerPixel = region.longitudeDelta / widthInPixels;
	    var lat = (y - heightInPixels / 2) * heightDegPerPixel + region.latitude;
	    var lon = (x - widthInPixels / 2) * widthDegPerPixel + region.longitude;
	    return {'lat': lat, 'lon': lon};
	}
};

FreeRideController.prototype.selectIncident = function(key){
	if (key) {
		this.currentIncidentKey = key;
	} else {
		// This means that no incident is selected
		if (this.currentIncident) freeRideView.reportMapComponent.view.remove(this.currentIncident);
		this.currentIncident = null;
		this.currentIncidentKey = null;
		this.currentIncidentCoordinates = null;
	}
};

FreeRideController.prototype.reportIncident = function(){
	if (this.currentIncident)
		this.openConfirmModal();
};

FreeRideController.prototype.confirmReport = function(){

	// Send report to backend
	if (this.currentIncident) {
		var type = this.currentIncident.id;
		var coords = getMapCoordinates();
		incidentClient.postIncident(type, coords.lat, coords.lon);
		freeRideView.reportMapComponent.view.remove(this.currentIncident);
		this.currentIncident = null;
		this.currentIncidentKey = null;
		this.currentIncidentCoordinates = null;
		freeRideView.incidentPanelComponent.clearPanelChildren();
	}
};

FreeRideController.prototype.openConfirmModal = function(){
	var animation = Ti.UI.createAnimation({
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		opacity: 1
	});
	freeRideView.confirmReportComponent.overlay.animate(animation);
	freeRideView.confirmReportComponent.modal.animate(animation);
};

FreeRideController.prototype.closeConfirmModal = function(){
	var animation = Ti.UI.createAnimation({
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		opacity: 0
	});
	freeRideView.confirmReportComponent.overlay.animate(animation);
	freeRideView.confirmReportComponent.modal.animate(animation);
};	

FreeRideController.prototype.addNearbyIncidents = function(){
	console.log("GET INCIDENTS");
	incidentClient.getAllIncidents(function (results){
		console.log("INCIDENTS");
		console.log(results);
		for (var key in results) {
			freeRideView.reportMapComponent.addIncident(results[key]);
		}
	});
};

FreeRideController.prototype.toggleFreeRideButton = function(){
	if (freeRideView.freeRideButtonComponent.label.text == 'Start!') {
		freeRideView.freeRideButtonComponent.label.setText('Finish');
	} else {
		freeRideView.freeRideButtonComponent.label.setText('Start!');
	}
};

// Special functions for when a ride from Direction view is over and it navigates to FreeRide

FreeRideController.prototype.fromDirectionWindow = function(polyline){
	// Place polyline on the map
	freeRideView.reportMapComponent.addPolyline(polyline);
	// Put modal about incidents
	freeRideView.fromDirectionComponent.render('','');
	// Show 'done' button
	freeRideView.doneButtonComponent.render();
};

FreeRideController.prototype.closeFromDirectionWindow = function(){
	freeRideView.reportMapComponent.removePolyline();
	freeRideView.doneButtonComponent.hide();
};






module.exports = FreeRideController;