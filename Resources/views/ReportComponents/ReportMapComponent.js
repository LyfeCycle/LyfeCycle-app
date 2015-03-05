function ReportMapComponent(){
	this.view = this.createReportMapView();
};

ReportMapComponent.prototype.createReportMapView = function(){
	var startLat = 42.3520314;
    var startLong = -71.1255678;
	var delta = 0.005;

	return MapModule.createView({
		mapType: MapModule.NORMAL_TYPE,
	    animate:true,
	    regionFit:true,
	    region: {latitude:startLat, longitude:startLong, latitudeDelta: delta, longitudeDelta: delta},
	    top: 0,
	    height: Constants.deviceHeight
	});
};

module.exports = ReportMapComponent;