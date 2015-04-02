var SideMenuView = function(){
	this.viewWidth = 100;
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
		left: -100,
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

	main.add(generateTableRow('Home', 0));
	main.add(generateTableRow('Maps', 1));
	main.add(generateTableRow('Free Ride', 2));
	main.add(generateTableRow('Social', 3));
	main.add(generateTableRow('Profile',4));
	return main;

	// HELPER FUNCTIONS

	function generateTableRow(name, index){
		var autoTop = 50;
		var height = 30;
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
				font: {fontSize: 14},
				width: '100%',
				textAlign: 'center'
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
				case 'Home':
					console.log("GO TO HOME");
					windowController.goToHomeWindow();
					break;
				case 'Maps':
					console.log("GO TO MAPS");
					windowController.goToDirectionWindow();
					break;
				case 'Free Ride':
					console.log("GO TO REPORTS");
					windowController.goToFreeRideWindow();
					break;
				case 'Social':
					console.log("GO TO SOCIAL");
					windowController.goToSocialWindow();
					break;
				case 'Profile':
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