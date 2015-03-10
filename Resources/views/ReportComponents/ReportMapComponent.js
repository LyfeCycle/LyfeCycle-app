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

ReportMapComponent.prototype.addIncident = function(incident){
	var annotation = MapModule.createAnnotation({
		latitude: incident.latitude,
		longitude: incident.longitude,
		image: IncidentTypeModel.IMAGES[incident.tag]
	});
	this.view.addAnnotation(annotation);
};

ReportMapComponent.prototype.addCurrentReportedIncidentToMap = function(key){

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
			bottom: '50%'
		})
	);
	return incident;
};

module.exports = ReportMapComponent;