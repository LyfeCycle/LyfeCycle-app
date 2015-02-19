var Constants = require('/views/Constants');
var map = require('ti.map');

function MapComponent(top) {
	this.view = this.createMapView(top);
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

MapComponent.prototype.addRouteToMap = function() {
	this.getRouteFromWeb();
}

MapComponent.prototype.getRouteFromWeb = function() {
	// Add the current variables to the object itself
	var self = this;

	// Now, send the request and then perform the proper actions
	var rURL =  'https://maps.googleapis.com/maps/api/directions/json?origin=' + 
				42.3520314 + ',' + -71.1255678 +
				'&destination=700 Commonwealth Avenue' +
				'&key=' + 'AIzaSyDfMM6xyEkzaRS8IzEkCbm6XdoF73EYeh0' + '&avoid=highways&mode=bicycling&sensor=false';	  

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
		 // self.addRouteToMap(self.parseJSONtoRoute(this.responseText, this.destination_point));
		 console.log(this.responseText);
		 alert("Got response");
		},
		onerror : function(e) {
		 alert("Error getting route!");
		},
		timeout : 10000
	 });

	// Send request
	client.open("GET", encodeURI(rURL));
	client.send();
}

module.exports = MapComponent;