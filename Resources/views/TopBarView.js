var TopBarView = function(name) {
	this.name = name;
	this.sideMenuButton = this.createSideMenuButton();
	this.barLabel = this.createBarLabel(name);
	this.view = this.createTopBarView();
};

TopBarView.prototype.createTopBarView = function() {
	var self = this;
	var main = Ti.UI.createView({
		backgroundColor: Constants.green,
		width: '100%',
		height: Constants.topBarHeight,
		top: 0,
		zIndex: 100
	});

	var bikeIcon = createLogoIcon();

	main.add(this.barLabel);
	main.add(bikeIcon);
	main.add(this.sideMenuButton);

	main.addEventListener('click', function(){
		if (self.name) {
			switch (self.name) {
				case 'home':
					windowController.homeSideMenu.render();
					break;
				case 'directions':
					windowController.directionSideMenu.render();
					break;
				case 'social':
					windowController.socialSideMenu.render();
					break;
				case 'free ride':
					windowController.freeRideSideMenu.render();
					break;
				case 'profile':
					windowController.profileSideMenu.render();
					break;
				default:
					break;
			}
		} else {
			sideMenuController.toggleSideMenu();
		}
	});

	return main;

	function createLogoIcon() {
		return Ti.UI.createImageView({
			image: '/images/bike_wheel_very_small.png',
			bottom: '7%',
			width: '12%',
			right: 5
		});
	}
};

TopBarView.prototype.createSideMenuButton = function(){
	return Ti.UI.createImageView({
		image: '/images/menu_small.png',
		width: '10%',
		bottom: '18%',
		left: 5
	});
};

TopBarView.prototype.createBarLabel = function(name){
	var text;
	if (name) text = name;
	else 'LyfeCycle';
	return Ti.UI.createLabel({
		font: {fontSize:36, fontFamily: Constants.font},
		text: name,
		top: '32%',
		color: 'black'
	});
};

TopBarView.prototype.setText = function(text){
	if (text) this.barLabel.setText(text);
};

module.exports = TopBarView;