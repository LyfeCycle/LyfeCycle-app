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
		console.log("Registering click");
		if (self.name) {
			switch (self.name) {
				case 'HOME':
					windowController.homeSideMenu.render();
					break;
				case 'DIRECTION':
					windowController.directionSideMenu.render();
					break;
				case 'SOCIAL':
					windowController.socialSideMenu.render();
					break;
				case 'FREE RIDE':
					windowController.freeRideSideMenu.render();
					break;
				case 'PROFILE':
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
			image: '/images/bike_wheel.png',
			bottom: '7%',
			width: '12%',
			right: 5
		});
	}
};

TopBarView.prototype.createSideMenuButton = function(){
	return Ti.UI.createImageView({
		image: '/images/sidemenu.png',
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
		font: {fontSize:28, fontFamily: Constants.fontMillion},
		text: name,
		top: '40%'
	});
};

TopBarView.prototype.setText = function(text){
	if (text) this.barLabel.setText(text);
};

module.exports = TopBarView;