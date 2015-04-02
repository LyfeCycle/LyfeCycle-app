var IncidentTypeModel = require('/models/IncidentTypeModel');

function IncidentController(){
	// These will always be the longitude delta
	this.prevFreeRideDelta = 0;
	this.prevDirectionDelta = 0;

	this.clusteringTolerance = 0.02;
	this.allIncidents = [];
	this.setIncidentListener(directionView.mapComponent.view);
	this.setIncidentListener(freeRideView.freeRideMapComponent.view);
};

IncidentController.prototype.getAllIncidents = function(callback){
	var self = this;
	incidentClient.getAllIncidents(function (results){
		self.allIncidents = results;
		callback();
	});
};

IncidentController.prototype.setIncidentListener = function(mapView){
	var self = this;
	mapView.addEventListener('regionChanged', function (evt){
		var topLat = (Math.abs(evt.latitude) + Math.abs(evt.latitudeDelta/2))*((evt.latitude > 0) ? 1 : -1);
		var bottomLat = (Math.abs(evt.latitude) - Math.abs(evt.latitudeDelta/2))*((evt.latitude > 0) ? 1 : -1);
		var leftLong = (Math.abs(evt.longitude) + Math.abs(evt.longitudeDelta/2))*((evt.longitude > 0) ? 1 : -1);
		var rightLong = (Math.abs(evt.longitude) - Math.abs(evt.longitudeDelta/2))*((evt.longitude > 0) ? 1 : -1);
		mapView.removeAllAnnotations();
		if (Math.abs(leftLong) - Math.abs(rightLong) > self.clusteringTolerance) 
			self.clusterPoints(mapView, topLat, bottomLat, leftLong, rightLong);
		else
			self.addRawAnnotations(mapView);
		// Add any incident reporting incidents
		if (mapView.id === 1 && freeRideController.currentIncidents.length > 0)
			for (var incident in freeRideController.currentIncidents)
				freeRideView.freeRideMapComponent.view.addAnnotation(freeRideController.currentIncidents[incident]);
	});
};

IncidentController.prototype.clusterPoints = function(mapView, topLat, bottomLat, leftLong, rightLong){
	var self = this;
	var grid = [[0,0,0],[0,0,0],[0,0,0]];
	var latThird = (Math.abs(bottomLat) - Math.abs(topLat))/3;
	var longThird = (Math.abs(rightLong) - Math.abs(leftLong))/3;
	if ((mapView.id === 0 ? this.prevDirectionDelta : this.prevFreeRideDelta) > (Math.abs(leftLong) - Math.abs(rightLong))) {
		for (var key in this.allIncidents) {
			if (this.pointInRegion(topLat, bottomLat, leftLong, rightLong, this.allIncidents[key])) {
				grid[Math.floor((Math.abs(this.allIncidents[key].latitude) - Math.abs(topLat))/latThird)][Math.floor((Math.abs(this.allIncidents[key].longitude) - Math.abs(leftLong))/longThird)]++;
			}
		}
		drawGrid(mapView, grid);
	} else {
		mapView.id === 0 ? this.prevDirectionDelta : this.prevFreeRideDelta = Math.abs(leftLong) - Math.abs(rightLong);
		this.getAllIncidents(function() {
			for (var key in self.allIncidents) {
				if (self.pointInRegion(topLat, bottomLat, leftLong, rightLong, self.allIncidents[key])) {
					grid[((Math.abs(self.allIncidents[key].latitude) - Math.abs(topLat))/latThird) | 0][((Math.abs(self.allIncidents[key].longitude) - Math.abs(leftLong))/longThird) | 0]++;
				}
			}
			drawGrid(mapView, grid);
		});
	}

	function drawGrid(mapView_, grid_){
		for (var i = 0; i < grid_.length; i++) {
			for (var j = 0; j < grid_[i].length; j++) {
				var size = (grid_[i][j] > 100) ? 100 : grid_[i][j];
				var view = Ti.UI.createView({
					height: size, width: size, backgroundColor: 'rgba(255,0,0,0.6)', borderRadius: size/2
				});
				var viewText = Ti.UI.createLabel({
					text: grid_[i][j] + '', color: 'white', font: {fontFamily: Constants.fontKG, fontSize: 12}
				});
				var filename = Titanium.Filesystem.tempDirectory + "/" + i + "_grid_" + j + ".png";
				var filenameText = Titanium.Filesystem.tempDirectory + "/" + i + "_text_" + j + ".png";
				Titanium.Filesystem.getFile(filename).write(view.toImage());
				Titanium.Filesystem.getFile(filenameText).write(viewText.toImage());

				if (grid_[i][j] > 1) {
					mapView_.addAnnotation(MapModule.createAnnotation({
						title: grid_[i][j],
						latitude: (topLat > 0) ? topLat + (latThird*i + latThird/2) : topLat + (latThird*i + latThird/2),
						longitude: (leftLong > 0) ? leftLong + (longThird*j + longThird/2) : leftLong - (longThird*j + longThird/2),
						image: filename
					}));
					if (grid_[i][j] > 17) {
						mapView_.addAnnotation(MapModule.createAnnotation({
							title: grid_[i][j],
							latitude: (topLat > 0) ? topLat + (latThird*i + latThird/2) : topLat + (latThird*i + latThird/2),
							longitude: (leftLong > 0) ? leftLong + (longThird*j + longThird/2) : leftLong - (longThird*j + longThird/2),
							image: filenameText
						}));
					}
				}
			}
		}
	};
};

IncidentController.prototype.addRawAnnotations = function(mapView, topLat, bottomLat, leftLong, rightLong){
	var self = this;
	if ((mapView.id === 0 ? this.prevDirectionDelta : this.prevFreeRideDelta) > (Math.abs(leftLong) - Math.abs(rightLong))) {
		// We've zoomed in - don't get new annotations
		for (var key in this.allIncidents) {
			if (this.pointInRegion(topLat, bottomLat, leftLong, rightLong, this.allIncidents[key])) {
				mapView.addAnnotation(MapModule.createAnnotation({
					latitude: this.allIncidents[key].latitude,
					longitude: this.allIncidents[key].longitude,
					image: IncidentTypeModel.IMAGES[this.allIncidents[key].tag]
				}));
			}
		}
	} else {
		mapView.id === 0 ? this.prevDirectionDelta = Math.abs(leftLong) - Math.abs(rightLong) : this.prevFreeRideDelta = Math.abs(leftLong) - Math.abs(rightLong);
		// zoomed out. Clear annotations and start again
		this.getAllIncidents(function() {
			for (var key in self.allIncidents) {
				if (self.pointInRegion(topLat, bottomLat, leftLong, rightLong, self.allIncidents[key], key)) {
					mapView.addAnnotation(MapModule.createAnnotation({
						latitude: self.allIncidents[key].latitude,
						longitude: self.allIncidents[key].longitude,
						image: IncidentTypeModel.IMAGES[self.allIncidents[key].tag]
					}));
				}
			}
		});
	}
};

IncidentController.prototype.pointInRegion = function(topRegion, bottomRegion, leftRegion, rightRegion, point, key){
	if (!settingsController.settingsArray[IncidentTypeModel.TYPES[point.tag]]) return false;
	if (point.latitude < bottomRegion || point.latitude > topRegion) return false;
	if (point.longitude < leftRegion || point.longitude > rightRegion) return false;
	return true;
};

IncidentController.prototype.mockReportedIncidents = function(annotations){
	for (var anno in annotations) {
		freeRideView.freeRideMapComponent.view.addAnnotation(
			MapModule.createAnnotation({
				latitude: annotations[anno].latitude,
				longitude: annotations[anno].longitude,
				image: IncidentTypeModel.IMAGES[annotations[anno].id]
			})
		);
	}
};

module.exports = IncidentController;