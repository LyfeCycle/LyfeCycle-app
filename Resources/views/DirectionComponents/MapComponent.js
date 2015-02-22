var Constants = require('/views/Constants');
var map = require('ti.map');

function MapComponent(top, routeListComponent) {
	this.view = this.createMapView(top);
	this.routeListComponent = routeListComponent;
}

MapComponent.prototype.createMapView = function(top) {
	var startLat = 42.3520314;
    var startLong = -71.1255678;
	var delta = 0.005;

	return map.createView({
		mapType: map.NORMAL_TYPE,
	    animate:true,
	    regionFit:true,
	    region: {latitude:startLat, longitude:startLong, latitudeDelta: delta, longitudeDelta: delta},
	    top: top,
	    height: Constants.deviceHeight - top
	});
}

module.exports = MapComponent;