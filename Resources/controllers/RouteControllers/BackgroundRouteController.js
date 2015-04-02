// This is the background handler, that will update everytime the location changes if there is a current route
var currentRide = Ti.App.Properties.getBool('currentRide');
var endLat = Ti.App.Properties.getDouble('endLat');
var endLong = Ti.App.Properties.getDouble('endLong');
var endTime = Ti.App.Properties.getObject('timeEndPredicted');
var polyline = Ti.App.Properties.getString('polyline');
var endLatitudeRange = 0.00082307035;
var endLongitudeRange = 0.00082308541;

if (currentRide) {
	Ti.Geolocation.addEventListener('location', function (e) {
        if (!e.error) {
            if (checkIfUserIsAtEndLocation(e.coords)) {
            	// Register user has finished ridein Properties
            	completedRide = true;
            	Ti.App.Properties.setBool('completedRide', true);
            	Ti.App.Properties.setObject('timeEndActual', new Date());
            	Ti.App.iOS.scheduleLocalNotification({
				    alertAction: "report incidents",
				    alertBody: "You finished your ride!",
				    badge: 1,
				    sound: "/alert.wav",
				    userInfo: {"path":"/controllers/RouteControllers/OpenLocalNotification.js"}
				}); 
				Ti.App.currentService.stop();
            }
        }
    });

	// If closes, schedule push notification
	var listener = Ti.App.currentService.addEventListener('stop',function(){
		if (!Ti.App.Properties.getBool('completedRide')) {
			var notification = Ti.App.iOS.scheduleLocalNotification({
			    alertAction: "complete ride",
			    alertBody: "Did you finish your ride?",
			    badge: 1,
			    date: endTime,
			    sound: "/alert.wav",
			    userInfo: {"id": "finish"}
			}); 
		}
	});

	// Line below is for testing
	// Ti.App.Properties.setBool('completedRide', true);
	Ti.App.iOS.scheduleLocalNotification({
	    alertAction: "complete ride",
	    alertBody: "Did you finish your ride?",
	    badge: 1,
	    date: new Date(new Date().getTime() + 3000),
	    sound: "/alert.wav",
	    userInfo: {"path":"/controllers/RouteControllers/OpenLocalNotification.js"}
	}); 

	function checkIfUserIsAtEndLocation(coords) {
		if (this.currentRide) {
			if (Math.abs(coords.latitude-endLat) > endLatitudeRange) 
				return false;
			else if (Math.abs(coords.longitude-endLong) > endLongitudeRange)
				return false;
			else 
				return true;
		} else return false;
	}
}