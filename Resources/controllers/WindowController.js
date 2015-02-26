function WindowController() {
	// Create windows for all sections of the app
	this.homeWindow = Titanium.UI.createWindow();
	this.settingsWindow = Titanium.UI.createWindow();
	this.loginWindow = Titanium.UI.createWindow();
	this.socialWindow = Titanium.UI.createWindow();
	this.directionWindow = Titanium.UI.createWindow();
	this.reportWindow = Titanium.UI.createWindow();
	this.enableLocationServicesWindow = Titanium.UI.createWindow();

	// Add top bar
	this.homeWindow.add(topBar.view);
	this.directionWindow.add(topBar.view);
	this.socialWindow.add(socialView.view);
	// Add views to appropriate windows
	this.homeWindow.add(homeMenuView.view);
	this.directionWindow.add(directionView.view);
	this.loginWindow.add(loginView.view);
	this.enableLocationServicesWindow.add(enableLocationView.view);
	this.socialWindow.add(socialView.view);
};

WindowController.prototype.goToHomeWindow = function() {
	topBar.setText('Home');
	this.homeWindow.open();
};

WindowController.prototype.goToDirectionWindow = function() {
	topBar.setText('Directions');
	directionController.showCurrentLocation();
	directionController.setUserPin();
	this.directionWindow.open();
};

WindowController.prototype.goToSocialWindow = function() {
	topBar.setText('Social');
	this.socialWindow.open();
}

WindowController.prototype.goToSettingsWindow = function() {
	topBar.setText('Settings');
	this.settingsWindow.open();
}

WindowController.prototype.goToLoginWindow = function() {
	this.loginWindow.open();
}

WindowController.prototype.goToReportWindow = function() {
	this.reportWindow.open();
}

WindowController.prototype.goToEnableLocationWindow = function(){
	this.enableLocationServicesWindow.open();
}

module.exports = WindowController;