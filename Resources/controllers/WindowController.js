function WindowController() {
	var self = this;
	// Create windows for all sections of the app
	this.homeWindow = Titanium.UI.createWindow();
	this.settingsWindow = Titanium.UI.createWindow();
	this.loginWindow = Titanium.UI.createWindow();
	this.socialWindow = Titanium.UI.createWindow();
	this.directionWindow = Titanium.UI.createWindow();
	this.reportWindow = Titanium.UI.createWindow();
	this.enableLocationServicesWindow = Titanium.UI.createWindow();
	this.currentWindow = null;

	// Add top bar
	this.homeWindow.add(topBar.view);
	this.directionWindow.add(topBar.view);
	this.socialWindow.add(topBar.view);

	// Add side menu
	this.homeWindow.add(sideMenuView.view);
	this.directionWindow.add(sideMenuView.view);
	this.socialWindow.add(sideMenuView.view);

	// Add views to appropriate windows
	this.homeWindow.add(homeMenuView.view);
	this.directionWindow.add(directionView.view);
	this.loginWindow.add(loginView.view);
	this.enableLocationServicesWindow.add(enableLocationView.view);
	this.socialWindow.add(socialView.view);

	// Create animations
	this.resetWindowAnimation = Ti.UI.createAnimation({
		left: 0,
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	});

	// Create listeners to grab current window
	this.homeWindow.addEventListener('open', function (e){ self.currentWindow = e.source; });
	this.settingsWindow.addEventListener('open', function (e){ self.currentWindow = e.source; });
	this.loginWindow.addEventListener('open', function (e){ self.currentWindow = e.source; });
	this.socialWindow.addEventListener('open', function (e){ self.currentWindow = e.source; });
	this.directionWindow.addEventListener('open', function (e){ self.currentWindow = e.source; });
	this.reportWindow.addEventListener('open', function (e){ self.currentWindow = e.source; });
	this.enableLocationServicesWindow.addEventListener('open', function (e){ self.currentWindow = e.source; });

};

WindowController.prototype.goToHomeWindow = function() {
	topBar.setText('Home');
	this.homeWindow.open(this.resetWindowAnimation);
};

WindowController.prototype.goToDirectionWindow = function() {
	topBar.setText('Directions');
	directionController.showCurrentLocation();
	directionController.setUserPin();
	this.directionWindow.open(this.resetWindowAnimation);
};

WindowController.prototype.goToSocialWindow = function() {
	topBar.setText('Social');
	this.socialWindow.open(this.resetWindowAnimation);
	socialController.refreshProfileCardTable();
};

WindowController.prototype.goToSettingsWindow = function() {
	topBar.setText('Settings');
	this.settingsWindow.open();
};

WindowController.prototype.goToLoginWindow = function() {
	this.loginWindow.open();
};

WindowController.prototype.goToReportWindow = function() {
	this.reportWindow.open(this.resetWindowAnimation);
};

WindowController.prototype.goToEnableLocationWindow = function(){
	this.enableLocationServicesWindow.open();
};

module.exports = WindowController;