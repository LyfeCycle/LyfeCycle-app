function GPSLocationController(){
	this.currentLatitude = null;
	this.currentLongitude = null;
	this.currentLocationTimestamp = null;
};

GPSLocationController.prototype.initGPS = function(){
    var self = this;
	Ti.Geolocation.purpose = 'Get Current Location';
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.distanceFilter = 10;
    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

    Ti.Geolocation.getCurrentPosition(function (e) { // Gets starting position
        if (e.error) {
            console.log('Couldn\'t get location - filled in fake coordinates');
            self.currentLatitude = 42.3520314;
            self.currentLongitude -71.1255678;
            self.currentLocationTimestamp = new Date();
        } else {
           	self.currentLatitude = e.coords.latitude;
            self.currentLongitude = e.coords.longitude;
            self.currentLocationTimestamp = e.coords.timestamp;
        }
    });

    // Updates when location changes
    Ti.Geolocation.addEventListener('location', function (e) {
        if (e.error) {
            console.log('Couldn\'t get location - filled in fake coordinates');
            self.currentLatitude = 42.3520314;
            self.currentLongitude -71.1255678;
            self.currentLocationTimestamp = new Date();
        } else {
            self.currentLatitude = e.coords.latitude;
            self.currentLongitude = e.coords.longitude;
            self.currentLocationTimestamp = e.coords.timestamp;
        }
    });
};

GPSLocationController.prototype.getCurrentLatitude = function(){
	return this.currentLatitude;
};

GPSLocationController.prototype.getCurrentLongitude = function(){
	return this.currentLongitude;
};

GPSLocationController.prototype.getCurrentCoordinates = function(){
	return {latitude: this.currentLatitude, longitude: this.currentLongitude};
};

module.exports = GPSLocationController;