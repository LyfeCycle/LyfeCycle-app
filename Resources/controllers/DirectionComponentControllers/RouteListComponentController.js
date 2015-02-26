function RouteListComponentController(){

};

RouteListComponentController.prototype.showList = function(stepsObject){
	directionView.routeListComponent.createDirectionTableHeader(stepsObject['end_destination_text']);
	var directionSection = Ti.UI.createTableViewSection({ headerTitle: 'Directions' });
	for (var i = 0; i < stepsObject['steps'].length; i++)
		directionSection.add(directionView.routeListComponent.createDirectionRow(stepsObject['steps'][i]));
	directionView.routeListComponent.view.setData([directionView.routeListComponent.tableHeader, directionSection]);
	directionView.routeListComponent.view.show();
};


module.exports = RouteListComponentController;