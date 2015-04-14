var SideMenuView = function(){
	this.viewWidth = Constants.deviceWidth-75;
	this.overlay = this.generateOverlay();
	this.view = this.generateSideMenuView();
	this.isOpen = false;

	// Animations
	this.openAnimation = Ti.UI.createAnimation({
		left: 0,
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	});
	this.closeAnimation = Ti.UI.createAnimation({
		left: -1*this.viewWidth,
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	});
	this.showOverlay = Ti.UI.createAnimation({
		opacity: 1.0,
		duration: 100,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	});
	this.hideOverlay = Ti.UI.createAnimation({
		opacity: 0.0,
		duration: 100,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	});
};

SideMenuView.prototype.generateOverlay = function(){
	var overlay = Ti.UI.createView({
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.4)',
		zIndex: 50,
		opacity: 0
	});

	overlay.addEventListener('click', function(){
		sideMenuController.closeSideMenu();
	});

	return overlay;
};

SideMenuView.prototype.generateSideMenuView = function(){
	var main = Ti.UI.createView({
		height: '100%',
		width: this.viewWidth,
		left: -1*this.viewWidth,
		backgroundColor: '#555',
		zIndex: 100
	});

	var logo = Ti.UI.createLabel({
		text: 'lyfecycle',
		font: {fontSize: 50, fontFamily: Constants.font},
		top: 50,
		color: 'white',
		textAlign: 'center'
	});

	main.add(logo);
	main.add(generateTableRow('home', 0));
	main.add(generateTableRow('maps', 1));
	main.add(generateTableRow('free ride', 2));
	main.add(generateTableRow('social', 3));
	main.add(generateTableRow('profile',4));

	return main;

	// HELPER FUNCTIONS

	function generateTableRow(name, index){
		var autoTop = 150;
		var height = 60;
		var row = Ti.UI.createView({
			height: height,
			width: '100%',
			id: name,
			top: autoTop + index*height
		});

		row.add(
			Ti.UI.createLabel({
				text: name,
				color: 'white',
				font: {fontSize: 32, fontFamily: Constants.font},
				width: '100%',
				textAlign: 'left',
				left: 25
			})
		);

		row.add(
			Ti.UI.createView({
				backgroundColor: 'white',
				bottom: 0,
				width: '100%',
				height: 1
			})
		);

		if (index === 0) {
			row.add(
				Ti.UI.createView({
					backgroundColor: 'white',
					top: 0,
					width: '100%',
					height: 1
				})
			);
		}

		row.addEventListener('click', function(){
			switch (row.id) {
				case 'home':
					console.log("GO TO HOME");
					windowController.goToHomeWindow();
					break;
				case 'maps':
					console.log("GO TO MAPS");
					windowController.goToDirectionWindow();
					break;
				case 'free ride':
					console.log("GO TO REPORTS");
					windowController.goToFreeRideWindow();
					break;
				case 'social':
					console.log("GO TO SOCIAL");
					windowController.goToSocialWindow();
					break;
				case 'profile':
					console.log("GO TO PROFILE");
					windowController.goToProfileWindow();
					break;
			}
		});

		return row;
	};
};

SideMenuView.prototype.close = function(){
	if (this.isOpen) {
		this.overlay.animate(this.hideOverlay);
		this.view.animate(this.closeAnimation);
		this.isOpen = false;
	}
};

SideMenuView.prototype.render = function(){
	if (!this.isOpen) {
		this.overlay.animate(this.showOverlay);
		this.view.animate(this.openAnimation);
		this.isOpen = true;
	}
};

module.exports = SideMenuView;