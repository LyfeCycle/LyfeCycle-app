function WindowController() {
	var self = this;
	// Create windows for all sections of the app
	this.homeWindow = Titanium.UI.createWindow();
	this.profileWindow = Titanium.UI.createWindow();
	this.loginWindow = Titanium.UI.createWindow();
	this.socialWindow = Titanium.UI.createWindow();
	this.directionWindow = Titanium.UI.createWindow();
	this.freeRideWindow = Titanium.UI.createWindow();
	this.enableLocationServicesWindow = Titanium.UI.createWindow();
	this.currentWindow = null;

	// Add top bar
	this.homeWindow.add(new TopBarView('home').view);
	this.directionWindow.add(new TopBarView('directions').view);
	this.socialWindow.add(new TopBarView('social').view);
	this.freeRideWindow.add(new TopBarView('free ride').view);
	this.profileWindow.add(new TopBarView('profile').view);

	this.homeSideMenu = new SideMenuView();
	this.directionSideMenu = new SideMenuView();
	this.socialSideMenu = new SideMenuView();
	this.freeRideSideMenu = new SideMenuView();
	this.profileSideMenu = new SideMenuView();

	// Add side menu & overlay
	this.homeWindow.add(this.homeSideMenu.view);
	this.directionWindow.add(this.directionSideMenu.view);
	this.socialWindow.add(this.socialSideMenu.view);
	this.freeRideWindow.add(this.freeRideSideMenu.view);
	this.profileWindow.add(this.profileSideMenu.view)

	this.homeWindow.add(this.homeSideMenu.overlay);
	this.directionWindow.add(this.directionSideMenu.overlay);
	this.socialWindow.add(this.socialSideMenu.overlay);
	this.freeRideWindow.add(this.freeRideSideMenu.overlay);
	this.profileWindow.add(this.profileSideMenu.overlay);

	// Add views to appropriate windows
	this.homeWindow.add(homeMenuView.view);
	this.directionWindow.add(directionView.view);
	this.loginWindow.add(loginView.view);
	this.socialWindow.add(socialView.view);
	this.freeRideWindow.add(freeRideView.view);
	this.profileWindow.add(profileView.view);
	this.enableLocationServicesWindow.add(enableLocationView.view);

	this.freeRideWindow.addEventListener('open', function (e){ self.currentWindow = e.source; 
		freeRideController.addNearbyIncidents(); 
	});

};

// We don't want to let anything happen with maps when we don't have their GPS

WindowController.prototype.goToHomeWindow = function() {
	topBar.setText('Home');
	this.homeWindow.open();
	this.homeWindow.show();
	this.profileWindow.hide();
	this.loginWindow.hide();
	this.socialWindow.hide();
	this.directionWindow.hide();
	this.freeRideWindow.hide();
	this.homeSideMenu.close();
	this.directionSideMenu.close();
	this.socialSideMenu.close();
	this.freeRideSideMenu.close();
	this.profileSideMenu.close();
	this.enableLocationServicesWindow.hide();
	sideMenuController.closeSideMenu(); 
};

WindowController.prototype.goToDirectionWindow = function() {
	topBar.setText('Directions');
	if (gpsLocationController.currentLatitude && gpsLocationController.currentLongitude) {
		directionController.setUserPin();
		this.directionWindow.open();
		this.homeWindow.hide();
		this.profileWindow.hide();
		this.loginWindow.hide();
		this.socialWindow.hide();
		this.directionWindow.show();
		this.freeRideWindow.hide();
		this.homeSideMenu.close();
		this.directionSideMenu.close();
		this.socialSideMenu.close();
		this.freeRideSideMenu.close();
		this.profileSideMenu.close();
		this.enableLocationServicesWindow.hide();
		directionController.showCurrentLocation();
		sideMenuController.closeSideMenu(); 
	} else {
		alert("We couldn't get your location. Do you have GPS turned on or connection to the internet?");
	}
};

WindowController.prototype.goToSocialWindow = function() {
	topBar.setText('Social');
	// this.socialWindow.show();
	this.socialWindow.open();
	this.homeWindow.hide();
	this.profileWindow.hide();
	this.loginWindow.hide();
	this.socialWindow.show();
	this.directionWindow.hide();
	this.freeRideWindow.hide();
	this.homeSideMenu.close();
	this.directionSideMenu.close();
	this.socialSideMenu.close();
	this.freeRideSideMenu.close();
	this.profileSideMenu.close();
	this.enableLocationServicesWindow.hide();
	socialController.refreshProfileCardTable();
	sideMenuController.closeSideMenu(); 
};

WindowController.prototype.goToProfileWindow = function() {
	topBar.setText('Profile');

	// Hack to refresh window to make sure card reflects login state
	profileView.refreshProfileView();
	this.profileWindow.remove(profileView.view);
	this.profileWindow.add(profileView.view);

	this.profileWindow.open();
	this.homeWindow.hide();
	this.profileWindow.show();
	this.loginWindow.hide();
	this.socialWindow.hide();
	this.directionWindow.hide();
	this.freeRideWindow.hide();
	this.homeSideMenu.close();
	this.directionSideMenu.close();
	this.socialSideMenu.close();
	this.freeRideSideMenu.close();
	this.profileSideMenu.close();
	this.enableLocationServicesWindow.hide();
	sideMenuController.closeSideMenu(); 
};

WindowController.prototype.goToLoginWindow = function() {
	this.loginWindow.open();
	this.homeWindow.hide();
	this.profileWindow.hide()
	this.loginWindow.show();
	this.socialWindow.hide();
	this.directionWindow.hide();
	this.freeRideWindow.hide();
	this.homeSideMenu.close();
	this.directionSideMenu.close();
	this.socialSideMenu.close();
	this.freeRideSideMenu.close();
	this.profileSideMenu.close();
	this.enableLocationServicesWindow.hide();
	sideMenuController.closeSideMenu(); 
};

WindowController.prototype.goToFreeRideWindow = function(polyline) {
	if (gpsLocationController.currentLatitude && gpsLocationController.currentLongitude) {
		topBar.setText('Free Ride');
		this.freeRideWindow.open();
		this.homeWindow.hide();
		this.profileWindow.hide()
		this.loginWindow.hide();
		this.socialWindow.hide();
		this.directionWindow.hide();
		this.freeRideWindow.show();
		freeRideController.showCurrentLocation();
		this.homeSideMenu.close();
		this.directionSideMenu.close();
		this.socialSideMenu.close();
		this.freeRideSideMenu.close();
		this.profileSideMenu.close();
		this.enableLocationServicesWindow.hide();
		// this.freeRideWindow.show();
		if (polyline) freeRideController.fromDirectionWindow(polyline);
		sideMenuController.closeSideMenu();
	} else {
		alert("We couldn't get your location. Do you have GPS turned on or connection to the internet?");
	}
};

WindowController.prototype.goToEnableLocationWindow = function(){
	this.enableLocationServicesWindow.open();
	this.homeWindow.hide();
	this.profileWindow.hide()
	this.loginWindow.hide();
	this.socialWindow.hide();
	this.directionWindow.hide();
	this.freeRideWindow.hide();
	this.homeSideMenu.close();
	this.directionSideMenu.close();
	this.socialSideMenu.close();
	this.freeRideSideMenu.close();
	this.profileSideMenu.close();
	this.enableLocationServicesWindow.show();
	sideMenuController.closeSideMenu(); 
};

module.exports = WindowController;