function ReportButtonComponent(){
	this.view = this.createReportButtonComponent();
};

ReportButtonComponent.prototype.createReportButtonComponent = function(){
	var main = Ti.UI.createView({
		width: '40%',
		height: '9%',
		bottom: -6,
		borderRadius: 8,
		backgroundColor: Constants.darkGreen
	});

	var label = Ti.UI.createLabel({
		font: {fontFamily: Constants.fontKG, fontSize: 20},
		text: 'Report',
		top: -3,
		color: 'white'
	});

	main.add(label);

	// Events 
	main.addEventListener('click', function(){
		// Report here
		if (freeRideController.currentIncidents.length > 0)
			freeRideController.openConfirmModal();
		else
			alert("Please select incident locations to report");
	});

	return main;
};

ReportButtonComponent.prototype.render = function(){
	this.view.animate(Ti.UI.createAnimation({
		bottom: -6,
		duration: 100
	}));
};

ReportButtonComponent.prototype.hide = function(){
	this.view.animate(Ti.UI.createAnimation({
		bottom: '-10%',
		duration: 100
	}));
};

module.exports = ReportButtonComponent;