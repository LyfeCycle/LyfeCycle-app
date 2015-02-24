var MapComponent = require('/views/DirectionComponents/MapComponent');
var RouteListComponent = require('/views/DirectionComponents/RouteListComponent');
var NavSearchComponent = require('/views/DirectionComponents/NavSearchComponent');


function DirectionView() {
	this.view = this.createDirectionView();
}

DirectionView.prototype.createDirectionView = function() {
	var main = Ti.UI.createView({
		width: '100%', height: Constants.viewHeight, bottom: 0
	});

	var routeListComponent = new RouteListComponent();
	var mapComponent = new MapComponent(0, routeListComponent);
	var navSearchComponent = new NavSearchComponent();

	main.add(mapComponent.view);
	main.add(routeListComponent.view);
	main.add(navSearchComponent.view);

	// Event Handlers
	navSearchComponent.navSearchButton.addEventListener('click', function(){
		routeListComponent.generateRouteList();
	});

	return main;
};

module.exports = DirectionView;

