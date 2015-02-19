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

WindowController.prototype.goToHomeView = function() {
	this.homeWindow.open();
	this.settingsWindow.close();
	this.loginWindow.close();
	this.socialWindow.close();
	this.directionWindow.close();
	this.reportWindow.close();
}

WindowController.prototype.goToDirectionView = function() {
	this.directionWindow.open();
	this.homeWindow.close();
	this.settingsWindow.close();
	this.loginWindow.close();
	this.socialWindow.close();
	this.reportWindow.close();
};

module.exports = WindowController;