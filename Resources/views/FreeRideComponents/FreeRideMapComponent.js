function FreeRideMapComponent(){
	this.view = this.createReportMapView();
};

FreeRideMapComponent.prototype.createReportMapView = function(){
	var startLat = 42.3520314;
    var startLong = -71.1255678;
	var delta = 0.005;

	var view = Ti.UI.createView({
		height: '100%', width: '100%'
	});

	var map = MapModule.createView({
		mapType: MapModule.NORMAL_TYPE,
	    animate:true,
	    regionFit:true,
	    region: {latitude:startLat, longitude:startLong, latitudeDelta: delta, longitudeDelta: delta},
	    top: 0,
	    height: Constants.deviceHeight,
	    id: 1
	});

	return map;
};

module.exports = FreeRideMapComponent;