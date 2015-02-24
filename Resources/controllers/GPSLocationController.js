function GPSLocationController(){
	this.currentLatitude = null;
	this.currentLongitude = null;
	this.currentLocationTimestamp = null;
};

GPSLocationController.prototype.initGPS = function(){
	Ti.Geolocation.purpose = 'Get Current Location';
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.distanceFilter = 10;
    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

    Ti.Geolocation.getCurrentPosition(function (e) { // Gets starting position
        if (e.error) {
            console.log('Couldn\'t get location');
        } else {
           	this.currentLatitude = e.coords.latitude;
            this.currentLatitude = e.coords.longitude;
            this.currentLocationTimestamp = e.coords.timestamp;
        }
    });

    // Updates when location changes
    Ti.Geolocation.addEventListener('location', function (e) {
        if (e.error) {
            console.log('Couldn\'t get location');
        } else {
            this.currentLatitude = e.coords.latitude;
            this.currentLatitude = e.coords.longitude;
            this.currentLocationTimestamp = e.coords.timestamp;
        }
    });
}

module.exports = GPSLocationController;