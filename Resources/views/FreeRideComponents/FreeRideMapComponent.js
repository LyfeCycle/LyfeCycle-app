function FreeRideMapComponent(){
	this.view = this.createReportMapView();
};

FreeRideMapComponent.prototype.createReportMapView = function(){

	return MapModule.createView({
		mapType: MapModule.NORMAL_TYPE,
	    animate:true,
	    regionFit:true,
	    region: {latitude: gpsLocationController.getCurrentLatitude(),
	    		longitude: gpsLocationController.getCurrentLongitude(),
	    		latitudeDelta: 0.001,
	    		longitudeDelta: 0.001},
	    top: 0,
	    height: Constants.deviceHeight,
	    id: 1,
	    zIndex: 0
	});

};

module.exports = FreeRideMapComponent;