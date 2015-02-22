function WindowController() {
	// Create windows for all sections of the app
	this.homeWindow = Titanium.UI.createWindow();
	this.settingsWindow = Titanium.UI.createWindow();
	this.loginWindow = Titanium.UI.createWindow();
	this.socialWindow = Titanium.UI.createWindow();
	this.directionWindow = Titanium.UI.createWindow();
	this.reportWindow = Titanium.UI.createWindow();

	// Add views to appropriate windows
	this.homeWindow.add(homeMenuView.view);
	this.directionWindow.add(directionView.view);
};

WindowController.prototype.goToHomeWindow = function() {
	this.settingsWindow.close();
	this.loginWindow.close();
	this.socialWindow.close();
	this.directionWindow.close();
	this.reportWindow.close();

	this.homeWindow.open();
};

WindowController.prototype.goToDirectionWindow = function() {
	this.homeWindow.close();
	this.settingsWindow.close();
	this.loginWindow.close();
	this.socialWindow.close();
	this.reportWindow.close();

	this.directionWindow.open();

};

WindowController.prototype.goToSocialWindow = function() {
	this.homeWindow.close();
	this.settingsWindow.close();
	this.loginWindow.close();
	this.directionWindow.close();
	this.reportWindow.close();

	this.socialWindow.open();
}

WindowController.prototype.goToSettingsWindow = function() {
	this.homeWindow.close();
	this.directionWindow.close();
	this.loginWindow.close();
	this.socialWindow.close();
	this.reportWindow.close();

	this.settingsWindow.open();
}

WindowController.prototype.goToLoginWindow = function() {
	this.homeWindow.close();
	this.directionWindow.close();
	this.settingsWindow.close();
	this.socialWindow.close();
	this.reportWindow.close();

	this.loginWindow.open();
}

WindowController.prototype.goToReportWindow = function() {
	this.homeWindow.close();
	this.directionWindow.close();
	this.settingsWindow.close();
	this.socialWindow.close();
	this.loginWindow.close();

	this.reportWindow.open();
}

module.exports = WindowController;