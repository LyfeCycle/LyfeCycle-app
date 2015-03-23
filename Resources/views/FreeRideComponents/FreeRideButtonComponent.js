function FreeRideButtonComponent(){
	this.view = this.createFreeRideButtonComponent();
};

FreeRideButtonComponent.prototype.createFreeRideButtonComponent = function(){
	var view = Ti.UI.createView({
		bottom: -55,
		left: -55,
		width: 110, height: 110,
		backgroundColor: Constants.green,
		borderRadius: 55
	});

	this.label = Ti.UI.createLabel({
		color: 'white',
		text: 'Start!',
		font: {fontFamily: Constants.fontKG, fontSize: 15},
		transform: Ti.UI.create2DMatrix({rotate: 45}),
		top: 20,
		right: 10
	});

	view.add(this.label);

	// Events
	view.addEventListener('click', function(){
		freeRideController.toggleFreeRideButton();
	});

	return view;
};

module.exports = FreeRideButtonComponent;

