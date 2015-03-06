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
		reportView.reportMapComponent.view.remove(this.currentIncident);
		this.currentIncident = null;
		reportView.incidentPanelComponent.clearPanelChildren();
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

module.exports = ReportController;