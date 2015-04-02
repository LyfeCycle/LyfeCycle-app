var FreeRideMapComponent = require('/views/FreeRideComponents/FreeRideMapComponent');
var IncidentPanelComponent = require('/views/FreeRideComponents/IncidentPanelComponent');
var DoneButtonComponent = require('/views/FreeRideComponents/DoneButtonComponent');
var ConfirmReportComponent = require('/views/FreeRideComponents/ConfirmReportComponent');
var FreeRideButtonComponent = require('/views/FreeRideComponents/FreeRideButtonComponent');
var ClearButtonComponent = require('/views/FreeRideComponents/ClearButtonComponent');
var FromDirectionComponent = require('/views/FreeRideComponents/FromDirectionComponent');
var ReportButtonComponent = require('/views/FreeRideComponents/ReportButtonComponent');

function FreeRideView(){
	this.incidentPanelComponent = new IncidentPanelComponent();
	this.freeRideMapComponent = new FreeRideMapComponent(); 
	this.doneButtonComponent = new DoneButtonComponent();
	this.clearButtonComponent = new ClearButtonComponent();
	this.freeRideButtonComponent = new FreeRideButtonComponent();
	this.confirmReportComponent = new ConfirmReportComponent();
	this.fromDirectionComponent = new FromDirectionComponent();
	this.reportButtonComponent = new ReportButtonComponent();
	this.activeRideBar = this.createActiveRideBar();
	this.view = this.createFreeRideView(0);
};

FreeRideView.prototype.createFreeRideView = function(top){
	var main = Ti.UI.createView({
		width: '100%', 
		height: Constants.viewHeight, 
		bottom: 0
	});

	main.add(this.freeRideMapComponent.view);
	main.add(this.incidentPanelComponent.view);
	main.add(this.activeRideBar.barView);
	main.add(this.freeRideButtonComponent.view);
	main.add(this.clearButtonComponent.view);
	main.add(this.doneButtonComponent.view);
	main.add(this.reportButtonComponent.view);
	main.add(this.fromDirectionComponent.view);
	main.add(this.confirmReportComponent.overlay);
	main.add(this.confirmReportComponent.modal);

	return main;
};

FreeRideView.prototype.createActiveRideBar = function(){
	var bar = this;
	bar.barView = Ti.UI.createView({
		width: '100%',
		height: 10,
		backgroundColor: 'yellow',
		bottom: -10
	});

	var activeLabel = Ti.UI.createLabel({
		font: {fontFamily: Constants.fontKG, fontSize: 10, fontStyle: 'italic'},
		text: 'Currently in Freeride Mode',
		right: 10,
		color: 'black'
	});

	bar.render = function(){
		console.log("RENDERING");
		bar.barView.animate(Ti.UI.createAnimation({
			bottom: 0, duration: 50
		}));
	};

	bar.hide = function(){
		console.log("CLOSING");
		bar.barView.animate(Ti.UI.createAnimation({
			bottom: -10, duration: 50
		}));
	};

	bar.barView.add(activeLabel);

	return bar;
};

module.exports = FreeRideView;