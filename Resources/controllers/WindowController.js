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
	this.reportWindow.add(topBar.view);

	// Add side menu & overlay
	this.homeWindow.add(sideMenuView.view);
	this.directionWindow.add(sideMenuView.view);
	this.socialWindow.add(sideMenuView.view);
	this.reportWindow.add(sideMenuView.view);
	this.homeWindow.add(sideMenuView.overlay);
	this.directionWindow.add(sideMenuView.overlay);
	this.socialWindow.add(sideMenuView.overlay);
	this.reportWindow.add(sideMenuView.overlay);

	// Add views to appropriate windows
	this.homeWindow.add(homeMenuView.view);
	this.directionWindow.add(directionView.view);
	this.loginWindow.add(loginView.view);
	this.socialWindow.add(socialView.view);
	this.reportWindow.add(reportView.view);
	this.enableLocationServicesWindow.add(enableLocationView.view);

	// Create listeners to grab current window
	this.homeWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });
	this.settingsWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });
	this.loginWindow.addEventListener('open', function (e){ self.currentWindow = e.source; });
	this.socialWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });
	this.directionWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });
	this.reportWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });
	this.enableLocationServicesWindow.addEventListener('open', function (e){ self.currentWindow = e.source; sideMenuController.closeSideMenu(); });

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
	this.reportWindow.open();
};

WindowController.prototype.goToEnableLocationWindow = function(){
	this.enableLocationServicesWindow.open();
};

module.exports = WindowController;