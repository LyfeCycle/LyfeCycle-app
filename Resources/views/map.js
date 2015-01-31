var map = require('ti.map');

function Map() {
	this.mapView;
	this.createMapView();
}

Map.prototype.createMapView = function() {
	this.mapView = map.createView({
		mapType:map.NORMAL_TYPE
	});
}

Map.prototype.getMapView = function(){
	return this.mapView;
}

module.exports = Map;