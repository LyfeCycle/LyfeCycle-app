function SideMenuController(){
	this.isOpen = false;
};

SideMenuController.prototype.closeSideMenu = function(){
	windowController.currentWindow.animate(Ti.UI.createAnimation({
		right: -80,
		left: 80,
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	}));
	this.isOpen = false;
};

SideMenuController.prototype.openSideMenu = function(){
	windowController.currentWindow.animate(Ti.UI.createAnimation({
		right: 0,
		left: 0,
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	}));
	this.isOpen = true;
};

SideMenuController.prototype.toggleSideMenu = function(){
	if (this.isOpen)
		this.closeSideMenu();
	else
		this.openSideMenu();
};

module.exports = SideMenuController;