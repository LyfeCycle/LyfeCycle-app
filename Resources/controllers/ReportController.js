function ReportController(){
	this.currentIncident = null;
};

ReportController.prototype.selectIncident = function(key){
	if (key) {

	} else {
		// This means that no incident is selected
		this.currentIncident = null;
	}
};

module.exports = ReportController;