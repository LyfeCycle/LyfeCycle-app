function ClearButtonComponent(){
	this.view = this.createClearButtonComponent();
};

ClearButtonComponent.prototype.createClearButtonComponent = function(){
	var view = Ti.UI.createView({
		top: -55,
		left: -55,
		width: 110, height: 110,
		backgroundColor: Constants.green,
		borderRadius: 55
	});

	this.label = Ti.UI.createLabel({
		color: 'white',
		text: 'Clear',
		font: {fontFamily: Constants.fontKG, fontSize: 15},
		transform: Ti.UI.create2DMatrix({rotate: -45}),
		bottom: 20,
		right: 5
	});

	view.add(this.label);

	// Events
	view.addEventListener('click', function(){
		// Remove all annotations
		for (var incident in freeRideController.currentIncidents)
			freeRideView.freeRideMapComponent.view.removeAnnotation(freeRideController.currentIncidents[incident]);
		freeRideController.currentIncidents = [];
	});

	return view;
};

ClearButtonComponent.prototype.hide = function(){
	this.view.animate(Ti.UI.createAnimation({
		left: -120,
		top: -120,
		duration: 100
	}));
};

ClearButtonComponent.prototype.render = function(){
	this.view.animate(Ti.UI.createAnimation({
		left: -55,
		top: -55,
		duration: 100
	}));
};

module.exports = ClearButtonComponent;

