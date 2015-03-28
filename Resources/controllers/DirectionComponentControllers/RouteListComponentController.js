function RouteListComponentController(){

};

RouteListComponentController.prototype.showList = function(stepsObject){
	directionView.routeListComponent.createDirectionTableHeader(stepsObject['end_destination_text']);
	var directionSection = Ti.UI.createTableViewSection({ headerTitle: 'Directions' });
	for (var i = 0; i < stepsObject['steps'].length; i++)
		directionSection.add(directionView.routeListComponent.createDirectionRow(stepsObject['steps'][i]));
	directionView.routeListComponent.table.setData([directionSection]);
	directionView.routeListComponent.view.show();
	directionView.routeListComponent.view.animate(Ti.UI.createAnimation({
		bottom: 0, duration: 100
	}));
	directionController.mapComponentController.minimizeMapComponent();
};

RouteListComponentController.prototype.cancelList = function(){
	var closeAnimation = Ti.UI.createAnimation({
		bottom: Constants.mapComponentHeightNegative,
		duration: 100
	});

	directionController.mapComponentController.maximizeMapComponent();
	directionView.routeListComponent.view.animate(closeAnimation);

	closeAnimation.addEventListener('complete', function(){
		directionView.routeListComponent.table.setData([]);
		directionView.routeListComponent.view.hide();
		directionController.mapComponentController.removePolyline();
		directionController.mapComponentController.removeRouteAnnotations();
	});
};

RouteListComponentController.prototype.hideList = function(){
	var polyline = directionController.mapComponentController.currentPolyline;
	windowController.goToFreeRideWindow(polyline);
	directionView.routeListComponent.table.setData([]);
	directionView.routeListComponent.view.hide();
	directionView.routeListComponent.view.setBottom(Constants.mapComponentHeightNegative);
	directionController.mapComponentController.removePolyline();
	directionController.mapComponentController.removeRouteAnnotations();
	directionController.mapComponentController.maximizeMapComponent();
};

RouteListComponentController.prototype.toggleRide = function(){
	if (directionView.routeListComponent.startButton.children[0].text === 'Go!') 
		this.startRide();
	else
		this.endRide();
};

RouteListComponentController.prototype.startRide = function(){
	directionView.routeListComponent.startButton.children[0].setText('Stop');
	directionView.routeListComponent.startButton.setBackgroundColor('red');
	directionView.routeListComponent.activeRouteBar.render();
	// Start route in RouteController
	routeController.startRoute();
};

RouteListComponentController.prototype.endRide = function(){
	directionView.routeListComponent.startButton.children[0].setText('Go!');
	directionView.routeListComponent.startButton.setBackgroundColor('yellow');
	directionView.routeListComponent.activeRouteBar.hide();
	this.hideList();
	routeController.endRoute();
	// Stop route in RouteController
};


module.exports = RouteListComponentController;