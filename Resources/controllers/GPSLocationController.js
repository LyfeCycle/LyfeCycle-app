function GPSLocationController(){
	Ti.Geolocation.purpose = 'Get Current Location';
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.distanceFilter = 10;
    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

    Ti.Geolocation.getCurrentPosition(function(e) { // Gets starting position
        if (e.error) {
            alert('Couldn\'t get location');

        } else {
            coordinates[0] = e.coords.latitude;
            coordinates[1] = e.coords.longitude;
            mainMap.updateValues(e.coords.latitude, e.coords.longitude, e.coords.timestamp);
        }
    });

    // Updates when location changes
    Ti.Geolocation.addEventListener('location', function(e) {
        if (e.error) {
            alert('Couldn\'t get location');
        } else {
            Ti.API.info(e.coords);
            coordinates[0] = e.coords.latitude;
            coordinates[1] = e.coords.longitude;
            mainMap.updateValues(e.coords.latitude, e.coords.longitude, e.coords.timestamp);
        }
    });
};

module.exports = GPSLocationController;