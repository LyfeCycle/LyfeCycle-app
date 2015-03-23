function FreeRideController(){
	this.currentIncident = null;
};

FreeRideController.prototype.selectIncident = function(key){
	if (key) {
		this.currentIncident = freeRideView.reportMapComponent.addCurrentReportedIncidentToMap(key);
	} else {
		// This means that no incident is selected
		if (this.currentIncident) freeRideView.reportMapComponent.view.remove(this.currentIncident);
		this.currentIncident = null;
	}
};

FreeRideController.prototype.reportIncident = function(){
	if (this.currentIncident)
		this.openConfirmModal();
	else
		alert("Please select an incident type to report.");
};

FreeRideController.prototype.confirmReport = function(){

	// Send report to backend
 
	if (this.currentIncident) {
		var type = this.currentIncident.id;
		var coords = getMapCoordinates();
		incidentClient.postIncident(type, coords.lat, coords.lon);
		freeRideView.reportMapComponent.view.remove(this.currentIncident);
		this.currentIncident = null;
		freeRideView.incidentPanelComponent.clearPanelChildren();
	}

	function getMapCoordinates() {
		var region = freeRideView.reportMapComponent.view.actualRegion || freeRideView.reportMapComponent.view.region;
	    var widthInPixels = freeRideView.reportMapComponent.view.rect.width;
	    var heightInPixels = freeRideView.reportMapComponent.view.rect.height;
	    // should invert because of the pixel reference frame
	    heightDegPerPixel = -region.latitudeDelta / heightInPixels; 
	    widthDegPerPixel = region.longitudeDelta / widthInPixels;
	    var lat = (heightInPixels / 2) * heightDegPerPixel + region.latitude;
	    var lon = (widthInPixels / 2) * widthDegPerPixel + region.longitude;
	    return {'lat': lat, 'lon': lon};
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
}

module.exports = FreeRideController;