var MapComponent = require('/views/DirectionComponents/MapComponent');
var RouteListComponent = require('/views/DirectionComponents/RouteListComponent');
var NavSearchComponent = require('/views/DirectionComponents/NavSearchComponent');


function DirectionView() {
	this.view = this.createDirectionView();
}

DirectionView.prototype.createDirectionView = function() {
	var self = this;

	var main = Ti.UI.createView({
		width: '100%', height: Constants.viewHeight, bottom: 0
	});

	this.routeListComponent = new RouteListComponent();
	this.mapComponent = new MapComponent();
	this.navSearchComponent = new NavSearchComponent();

	main.add(this.mapComponent.view);
	main.add(this.routeListComponent.view);
	main.add(this.navSearchComponent.view);

	// Event Handlers
	this.navSearchComponent.navSearchButton.addEventListener('click', function(){
		if (self.navSearchComponent.navSearchBar.value)
			directionController.getDirections(self.navSearchComponent.navSearchBar.value);
	});

	return main;
};

DirectionView.prototype.addPinToMap = function(coordinates, id, image) {

	var pin = MapModule.createAnnotation({
	    latitude: gpsLocationController.getCurrentLatitude(),
	    longitude: gpsLocationController.getCurrentLongitude(),
	    title: "You are here!",
	    image: image,
	    myid:  id ? id : null// Custom property to uniquely identify this annotation.
	});
	this.mapComponent.view.addAnnotation(pin);
};

module.exports = DirectionView;

