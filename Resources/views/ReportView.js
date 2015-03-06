var ReportMapComponent = require('/views/ReportComponents/ReportMapComponent');
var IncidentPanelComponent = require('/views/ReportComponents/IncidentPanelComponent');
var ReportButtonComponent = require('/views/ReportComponents/ReportButtonComponent');

function ReportView(){
	this.incidentPanelComponent = new IncidentPanelComponent();
	this.reportMapComponent = new ReportMapComponent(); 
	this.reportButtonComponent = new ReportButtonComponent();
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
	main.add(this.reportButtonComponent.view);

	return main;
};

module.exports = ReportView;