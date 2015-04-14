function DoneButtonComponent(){
	this.view = this.createDoneButtonComponent();
};

DoneButtonComponent.prototype.createDoneButtonComponent = function(){
	var main = Ti.UI.createView({
		width: '40%',
		height: '9%',
		bottom: '-10%',
		borderRadius: 8,
		backgroundColor: Constants.darkGreen
	});

	var label = Ti.UI.createLabel({
		font: {fontFamily: Constants.font, fontSize: 20},
		text: 'Done',
		top: -3,
		color: 'white'
	});

	main.add(label);

	// Events 
	main.addEventListener('click', function(){
		freeRideController.closeFromDirectionWindow();
	});

	return main;
};

DoneButtonComponent.prototype.render = function(){
	this.view.animate(Ti.UI.createAnimation({
		bottom: -6,
		duration: 100
	}));
};

DoneButtonComponent.prototype.hide = function(){
	// this.view.hide();
	this.view.animate(Ti.UI.createAnimation({
		bottom: '-10%',
		duration: 100
	}));
};

module.exports = DoneButtonComponent;