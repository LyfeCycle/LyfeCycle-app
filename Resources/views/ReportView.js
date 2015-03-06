var ReportMapComponent = require('/views/ReportComponents/ReportMapComponent');
var IncidentPanelComponent = require('/views/ReportComponents/IncidentPanelComponent');
var ReportButtonComponent = require('/views/ReportComponents/ReportButtonComponent');
var ConfirmReportComponent = require('/views/ReportComponents/ConfirmReportComponent');

function ReportView(){
	this.incidentPanelComponent = new IncidentPanelComponent();
	this.reportMapComponent = new ReportMapComponent(); 
	this.reportButtonComponent = new ReportButtonComponent();
	this.confirmReportComponent = new ConfirmReportComponent();
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
	main.add(this.confirmReportComponent.overlay);
	main.add(this.confirmReportComponent.modal);

	return main;
};

module.exports = ReportView;