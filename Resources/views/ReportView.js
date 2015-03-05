var ReportMapComponent = require('/views/ReportComponents/ReportMapComponent');
var IncidentPanelComponent = require('/views/ReportComponents/IncidentPanelComponent');

function ReportView(){
	this.incidentPanelComponent = new IncidentPanelComponent();
	this.reportMapComponent = new ReportMapComponent(); 
	this.view = this.createReportView(0);
};

ReportView.prototype.createReportView = function(top){
	var main = Ti.UI.createView({
		width: '100%', 
		height: Constants.viewHeight, 
		bottom: 0
	});

	main.add(this.reportMapComponent.view);
	main.add(this.incidentPanelComponent.view);

	return main;
};

module.exports = ReportView;