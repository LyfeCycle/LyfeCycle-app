function DoneButtonComponent(){
	this.view = this.createDoneButtonComponent();
};

DoneButtonComponent.prototype.createDoneButtonComponent = function(){
	var main = Ti.UI.createView({
		width: '40%',
		height: '9%',
		bottom: -6,
		borderRadius: 8,
		backgroundColor: Constants.darkGreen,
		visible: false
	});

	var label = Ti.UI.createLabel({
		font: {fontFamily: Constants.fontKG, fontSize: 20},
		text: 'Done',
		top: -3,
		color: 'white'
	});

	main.add(label);

	// Events
	// main.addEventListener('click', function(){
	// 	freeRideController.reportIncident();
	// });
	main.addEventListener('click', function(){
		freeRideController.closeFromDirectionWindow();
	});

	return main;
};

DoneButtonComponent.prototype.render = function(){
	this.view.show();
};

DoneButtonComponent.prototype.hide = function(){
	this.view.hide();
};

module.exports = DoneButtonComponent;