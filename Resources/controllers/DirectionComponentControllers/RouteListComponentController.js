function RouteListComponentController(){

};

RouteListComponentController.prototype.showList = function(stepsObject){
	directionView.routeListComponent.createDirectionTableHeader(stepsObject['end_destination_text']);
	var directionSection = Ti.UI.createTableViewSection({ headerTitle: 'Directions' });
	for (var i = 0; i < stepsObject['steps'].length; i++)
		directionSection.add(directionView.routeListComponent.createDirectionRow(stepsObject['steps'][i]));
	directionView.routeListComponent.table.setData([directionSection]);
	directionView.routeListComponent.view.show();
};

RouteListComponentController.prototype.hideList = function(){
	directionView.routeListComponent.table.setData([]);
	directionView.routeListComponent.view.hide();
	var polyline = directionController.mapComponentController.currentPolyline;
	directionController.mapComponentController.removePolyline();
	directionController.mapComponentController.removeRouteAnnotations();
	windowController.goToFreeRideWindow(polyline);
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
	directionView.routeListComponent.activeRouteBar.setVisible(true);
};

RouteListComponentController.prototype.endRide = function(){
	directionView.routeListComponent.startButton.children[0].setText('Go!');
	directionView.routeListComponent.startButton.setBackgroundColor('yellow');
	directionView.routeListComponent.activeRouteBar.setVisible(false);
	this.hideList();
	// Remove list
};


module.exports = RouteListComponentController;