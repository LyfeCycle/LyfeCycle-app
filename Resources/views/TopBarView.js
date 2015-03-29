var TopBarView = function() {
	this.sideMenuButton = this.createSideMenuButton();
	this.barLabel = this.createBarLabel();
	this.view = this.createTopBarView();
};

TopBarView.prototype.createTopBarView = function() {
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

	this.sideMenuButton.addEventListener('click', function(){
		console.log("Registering click");
		sideMenuController.toggleSideMenu();
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

TopBarView.prototype.createBarLabel = function(){
	return Ti.UI.createLabel({
		font: {fontSize:28, fontFamily: Constants.fontMillion},
		text: 'LyfeCycle',
		top: '40%'
	});
};

TopBarView.prototype.setText = function(text){
	if (text) this.barLabel.setText(text);
};

module.exports = TopBarView;