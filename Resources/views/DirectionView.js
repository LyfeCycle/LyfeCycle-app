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

	this.routeListComponent = new RouteListComponent();
	this.mapComponent = new MapComponent(0);
	this.navSearchComponent = new NavSearchComponent();

	main.add(this.mapComponent.view);
	main.add(this.routeListComponent.view);
	main.add(this.navSearchComponent.view);

	// Event Handlers
	this.navSearchComponent.navSearchButton.addEventListener('click', function(){
		routeListComponent.generateRouteList();
	});

	return main;
};

DirectionView.prototype.addPinToMap = function(coordinates, image) {
	console.log(this.routeListComponent);
};

module.exports = DirectionView;

