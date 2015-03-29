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
	this.homeWindow.add(topBar.view);
	this.directionWindow.add(topBar.view);
	this.socialWindow.add(topBar.view);
	this.freeRideWindow.add(topBar.view);

	// Add side menu & overlay
	this.homeWindow.add(sideMenuView.view);
	this.directionWindow.add(sideMenuView.view);
	this.socialWindow.add(sideMenuView.view);
	this.freeRideWindow.add(sideMenuView.view);
	this.homeWindow.add(sideMenuView.overlay);
	this.directionWindow.add(sideMenuView.overlay);
	this.socialWindow.add(sideMenuView.overlay);
	this.freeRideWindow.add(sideMenuView.overlay);

	// Add views to appropriate windows
	this.homeWindow.add(homeMenuView.view);
	this.directionWindow.add(directionView.view);
	this.loginWindow.add(loginView.view);
	this.socialWindow.add(socialView.view);
	this.freeRideWindow.add(freeRideView.view);
	this.enableLocationServicesWindow.add(enableLocationView.view);

	// Create listeners to grab current window
	this.homeWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });
	this.profileWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });
	this.loginWindow.addEventListener('open', function (e){ self.currentWindow = e.source; });
	this.socialWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });
	this.directionWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });
	this.freeRideWindow.addEventListener('open', function (e){ self.currentWindow = e.source; 
		sideMenuController.closeSideMenu(); 
		freeRideController.addNearbyIncidents(); 
	});
	this.enableLocationServicesWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });

};

// We don't want to let anything happen with maps when we don't have their GPS

WindowController.prototype.goToHomeWindow = function() {
	topBar.setText('Home');
	this.homeWindow.open();
	sideMenuController.closeSideMenu(); 
};

WindowController.prototype.goToDirectionWindow = function() {
	topBar.setText('Directions');
	if (gpsLocationController.currentLatitude && gpsLocationController.currentLongitude) {
		directionController.showCurrentLocation();
		directionController.setUserPin();
		this.directionWindow.open();
		sideMenuController.closeSideMenu(); 
	} else {
		alert("We couldn't get your location. Do you have GPS turned on or connection to the internet?");
	}
};

WindowController.prototype.goToSocialWindow = function() {
	topBar.setText('Social');
	this.socialWindow.open();
	socialController.refreshProfileCardTable();
	sideMenuController.closeSideMenu(); 
};

WindowController.prototype.goToProfileWindow = function() {
	topBar.setText('Profile');
	this.profileWindow.open();
	sideMenuController.closeSideMenu(); 
};

WindowController.prototype.goToLoginWindow = function() {
	this.loginWindow.open();
	sideMenuController.closeSideMenu(); 
};

WindowController.prototype.goToFreeRideWindow = function(polyline) {
	if (gpsLocationController.currentLatitude && gpsLocationController.currentLongitude) {
		topBar.setText('Free Ride');
		this.freeRideWindow.open();
		if (polyline) freeRideController.fromDirectionWindow(polyline);
		sideMenuController.closeSideMenu();
	} else {
		alert("We couldn't get your location. Do you have GPS turned on or connection to the internet?");
	}
};

WindowController.prototype.goToEnableLocationWindow = function(){
	this.enableLocationServicesWindow.open();
	sideMenuController.closeSideMenu(); 
};

module.exports = WindowController;