// This is the background handler, that will update everytime the location changes if there is a current route
var currentRide = Ti.App.Properties.getBool('currentRide');
var endLat = Ti.App.Properties.getDouble('endLat');
var endLong = Ti.App.Properties.getDouble('endLong');
var endTime = Ti.App.Properties.getObject('timeEndPredicted');

if (currentRide) {

	// If closes, schedule push notification
	Ti.App.currentService.addEventListener('stop',function(){
		var notification = Ti.App.iOS.scheduleLocalNotification({
		    alertAction: "complete ride",
		    // Alert will display the following message
		    alertBody: "Did you finish your ride?",
		    // The badge value in the icon will be changed to 1
		    badge: 1,
		    // Alert will be sent in three seconds
		    date: endTime,
		    // The following sound file will be played
		    sound: "/alert.wav",
		    userInfo: {"path":"/controllers/RouteControllers/OpenLocalNotification.js"}
		}); 
	});
}