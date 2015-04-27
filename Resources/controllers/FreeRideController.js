var FreeRideMapComponentController = require('/controllers/FreeRideComponentControllers/FreeRideMapComponentController');

function FreeRideController(){
	this.currentIncidents = [];
	this.currentIncidentKey = null;
	this.currentIncidentCoordinates = null;
	this.freeRideMapComponentController = new FreeRideMapComponentController();

	var self = this;
	// Set up event listener for the FreeRide map view
	freeRideView.freeRideMapComponent.view.addEventListener('longpress', function (source){	
		if (self.currentIncidentKey) {
			self.currentIncidentCoordinates = getMapCoordinates(source.x, source.y);
			self.currentIncidents.push(self.freeRideMapComponentController.addCurrentReportedIncidentToMap(self.currentIncidentKey, self.currentIncidentCoordinates));
		}
	});


	function getMapCoordinates(x, y) {
		var region = freeRideView.freeRideMapComponent.view.actualRegion || freeRideView.freeRideMapComponent.view.region;
	    var widthInPixels = freeRideView.freeRideMapComponent.view.rect.width;
	    var heightInPixels = freeRideView.freeRideMapComponent.view.rect.height;
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
		this.currentIncidentKey = null;
		this.currentIncidentCoordinates = null;
	}
};

FreeRideController.prototype.reportIncident = function(){
	if (this.currentIncidents.length > 0)
		this.openConfirmModal();
};

FreeRideController.prototype.confirmReport = function(){
	var json = [];
	if (fb.loggedIn) {
		// Send report to backend
		if (this.currentIncidents.length > 0) {
			for (var incident in this.currentIncidents) {
				var type = this.currentIncidents[incident].id;
				json.push(
						{  name: 'fromApp', 
						   latitude: String(this.currentIncidents[incident].latitude),
						   longitude: String(this.currentIncidents[incident].longitude),
						   tag: this.currentIncidents[incident].id
						});
				freeRideView.freeRideMapComponent.view.removeAnnotation(this.currentIncidents[incident]);
			}
			incidentClient.postIncidents(json);
			incidentController.mockReportedIncidents(this.currentIncidents);
			this.currentIncidents = [];
			this.currentIncidentKey = null;
			this.currentIncidentCoordinates = null;
			freeRideView.incidentPanelComponent.clearPanelChildren();
		}
	}
	else {
		alert("Please log in to report incidents!");
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
	
};

FreeRideController.prototype.toggleFreeRideButton = function(){
	if (freeRideView.freeRideButtonComponent.label.text == 'Start!') {
		freeRideView.freeRideButtonComponent.label.setText('Finish');
		freeRideView.activeRideBar.render();
		freeRideView.reportButtonComponent.hide();
		freeRideView.clearButtonComponent.hide();
		for (var incident in freeRideController.currentIncidents){
			freeRideView.freeRideMapComponent.view.removeAnnotation(freeRideController.currentIncidents[incident]);
		}
		freeRideController.currentIncidents = [];
	} else {
		freeRideView.freeRideButtonComponent.label.setText('Start!');
		freeRideView.activeRideBar.hide();
		freeRideView.reportButtonComponent.render();
		freeRideView.clearButtonComponent.render();
	}
};

// Special functions for when a ride from Direction view is over and it navigates to FreeRide

FreeRideController.prototype.fromDirectionWindow = function(polyline){
	// Place polyline on the map
	this.freeRideMapComponentController.addPolyline(polyline);
	// Put modal about incidents
	freeRideView.fromDirectionComponent.render(Ti.App.Properties.getObject('timeStarted'), Ti.App.Properties.getObject('timeEndActual'), Ti.App.Properties.getObject('timeEndPredicted'));
	// Show 'done' button
	freeRideView.doneButtonComponent.render();
	freeRideView.freeRideButtonComponent.hide();
	freeRideView.reportButtonComponent.hide();
	routeController.endRoute();
};

FreeRideController.prototype.closeFromDirectionWindow = function(){
	this.freeRideMapComponentController.removePolyline();
	freeRideView.doneButtonComponent.hide();
	freeRideView.freeRideButtonComponent.render();
	freeRideView.reportButtonComponent.render();
};

FreeRideController.prototype.showCurrentLocation = function(){
	this.freeRideMapComponentController.showCurrentLocation();
};

module.exports = FreeRideController;