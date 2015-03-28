function FreeRideMapComponent(){
	this.currentPolyline;
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
	    height: Constants.deviceHeight
	});

	return map;
};

FreeRideMapComponent.prototype.addIncident = function(incident){
	var annotation = MapModule.createAnnotation({
		latitude: incident.latitude,
		longitude: incident.longitude,
		image: IncidentTypeModel.IMAGES[incident.tag]
	});
	this.view.addAnnotation(annotation);
};

FreeRideMapComponent.prototype.addPolyline = function(polyline){
	if (this.currentPolyline) this.view.removeRoute(this.currentPolyline);
	this.currentPolyline = polyline;
	this.view.addRoute(this.currentPolyline);
};

FreeRideMapComponent.prototype.removePolyline = function(){
	if (this.currentPolyline) this.view.removeRoute(this.currentPolyline);
	this.currentPolyline = null;
};

FreeRideMapComponent.prototype.addCurrentReportedIncidentToMap = function(key, source){

	var incident = Ti.UI.createView({
		height: 52,
		bottom: '100%',
		id: key
	});

	var img = Ti.UI.createImageView({
		id: key,
		image: IncidentTypeModel.IMAGES[key],
		height: '90%'
	});

	var arrow = Ti.UI.createImageView({
		image: 'images/arrow_down.png',
		height: 30,
		bottom: 0
	});

	var circle = Ti.UI.createView({
		height: 34,
		width: 34,
		backgroundColor: 'yellow',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 17,
		top: 0
	});

	circle.add(img);
	incident.add(arrow);
	incident.add(circle);

	this.view.add(incident);

	// Animations
	incident.animate(
		Ti.UI.createAnimation({
			duration: 150,
			top: source.y - Constants.deviceHeight*0.11,
			left: 40
		})
	);
	return incident;
};

module.exports = FreeRideMapComponent;