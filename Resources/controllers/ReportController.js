function ReportController(){
	this.currentIncident = null;
};

ReportController.prototype.selectIncident = function(key){
	if (key) {
		this.currentIncident = reportView.reportMapComponent.addCurrentReportedIncidentToMap(key);
	} else {
		// This means that no incident is selected
		if (this.currentIncident) reportView.reportMapComponent.view.remove(this.currentIncident);
		this.currentIncident = null;
	}
};

ReportController.prototype.reportIncident = function(){
	if (this.currentIncident)
		this.openConfirmModal();
	else
		alert("Please select an incident type to report.");
};

ReportController.prototype.confirmReport = function(){

	// Send report to backend
 
	if (this.currentIncident) {
		var type = this.currentIncident.id;
		var coords = getMapCoordinates();
		incidentClient.postIncident(type, coords.lat, coords.lon);
		reportView.reportMapComponent.view.remove(this.currentIncident);
		this.currentIncident = null;
		reportView.incidentPanelComponent.clearPanelChildren();
	}

	function getMapCoordinates() {
		var region = reportView.reportMapComponent.view.actualRegion || reportView.reportMapComponent.view.region;
	    var widthInPixels = reportView.reportMapComponent.view.rect.width;
	    var heightInPixels = reportView.reportMapComponent.view.rect.height;
	    // should invert because of the pixel reference frame
	    heightDegPerPixel = -region.latitudeDelta / heightInPixels; 
	    widthDegPerPixel = region.longitudeDelta / widthInPixels;
	    var lat = (heightInPixels / 2) * heightDegPerPixel + region.latitude;
	    var lon = (widthInPixels / 2) * widthDegPerPixel + region.longitude;
	    return {'lat': lat, 'lon': lon};
	}
};

ReportController.prototype.openConfirmModal = function(){
	var animation = Ti.UI.createAnimation({
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		opacity: 1
	});
	reportView.confirmReportComponent.overlay.animate(animation);
	reportView.confirmReportComponent.modal.animate(animation);
};

ReportController.prototype.closeConfirmModal = function(){
	var animation = Ti.UI.createAnimation({
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		opacity: 0
	});
	reportView.confirmReportComponent.overlay.animate(animation);
	reportView.confirmReportComponent.modal.animate(animation);
};	

ReportController.prototype.addNearbyIncidents = function(){
	console.log("GET INCIDENTS");
	incidentClient.getAllIncidents(function (results){
		console.log("INCIDENTS");
		console.log(results);
		for (var key in results) {
			reportView.reportMapComponent.addIncident(results[key]);
		}
	});
};

module.exports = ReportController;