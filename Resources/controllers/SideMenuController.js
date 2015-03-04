function SideMenuController(){
	this.isOpen = false;

	// Animations
	this.openAnimation = Ti.UI.createAnimation({
		left: 0,
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	});
	this.closeAnimation = Ti.UI.createAnimation({
		left: -1*sideMenuView.viewWidth,
		duration: 200,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	});
	this.showOverlay = Ti.UI.createAnimation({
		opacity: 1.0,
		duration: 100,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	});
	this.hideOverlay = Ti.UI.createAnimation({
		opacity: 0.0,
		duration: 100,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	});
};

SideMenuController.prototype.closeSideMenu = function(){
	if (this.isOpen) {
		sideMenuView.overlay.animate(this.hideOverlay);
		sideMenuView.view.animate(this.closeAnimation);
		this.isOpen = false;
	}
};

SideMenuController.prototype.openSideMenu = function(){
	if (!this.isOpen) {
		sideMenuView.overlay.animate(this.showOverlay);
		sideMenuView.view.animate(this.openAnimation);
		this.isOpen = true;
	}
};

SideMenuController.prototype.toggleSideMenu = function(){
	if (this.isOpen)
		this.closeSideMenu();
	else
		this.openSideMenu();
};

module.exports = SideMenuController;