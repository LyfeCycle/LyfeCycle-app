function WindowController() {
	
};

function WindowController() {
	// Create windows for all sections of the app
	this.main = Titanium.UI.createWindow();
	this.settings = Titanium.UI.createWindow();
	this.login = Titanium.UI.createWindow();
	this.social = Titanium.UI.createWindow();
	this.route = Titanium.UI.createWindow();
	this.report = Titanium.UI.createWindow();

};

WindowController.prototype.goToMain = function() {
	this.main.add(homeMenu.view);
	this.main.open();
}

WindowController.prototype.goToRoute = function() {
	route.add(map.view);
	route.open();
}

module.exports = WindowController;