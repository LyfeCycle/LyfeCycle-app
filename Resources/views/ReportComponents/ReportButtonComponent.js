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

	return main;
};

module.exports = ReportButtonComponent;