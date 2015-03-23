var ReportMapComponent = require('/views/FreeRideComponents/ReportMapComponent');
var IncidentPanelComponent = require('/views/FreeRideComponents/IncidentPanelComponent');
var DoneButtonComponent = require('/views/FreeRideComponents/DoneButtonComponent');
var ConfirmReportComponent = require('/views/FreeRideComponents/ConfirmReportComponent');
var FreeRideButtonComponent = require('/views/FreeRideComponents/FreeRideButtonComponent');
var FromDirectionComponent = require('/views/FreeRideComponents/FromDirectionComponent');

function FreeRideView(){
	this.incidentPanelComponent = new IncidentPanelComponent();
	this.reportMapComponent = new ReportMapComponent(); 
	this.doneButtonComponent = new DoneButtonComponent();
	this.freeRideButtonComponent = new FreeRideButtonComponent();
	this.confirmReportComponent = new ConfirmReportComponent();
	this.fromDirectionComponent = new FromDirectionComponent();
	this.view = this.createFreeRideView(0);
};

FreeRideView.prototype.createFreeRideView = function(top){
	var main = Ti.UI.createView({
		width: '100%', 
		height: Constants.viewHeight, 
		bottom: 0
	});

	main.add(this.reportMapComponent.view);
	main.add(this.incidentPanelComponent.view);
	main.add(this.freeRideButtonComponent.view);
	main.add(this.doneButtonComponent);
	main.add(this.fromDirectionComponent.view);
	main.add(this.confirmReportComponent.overlay);
	main.add(this.confirmReportComponent.modal);

	return main;
};

module.exports = FreeRideView;