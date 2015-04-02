module.exports.registerForPush = function(){
    // Register for push notifications
    var deviceToken = null;
    // Check if the device is running iOS 8 or later
    if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
     
     // Wait for user settings to be registered before registering for push notifications
        Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
     
     // Remove event listener once registered for push notifications
            Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
     
            Ti.Network.registerForPushNotifications({
                success: deviceTokenSuccess,
                error: deviceTokenError,
                callback: receivePush
            });
        });
     
     // Register notification types to use
        Ti.App.iOS.registerUserNotificationSettings({
            types: [
                Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
                Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
                Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
            ]
        });
    }
     
    // For iOS 7 and earlier
    else {
        Ti.Network.registerForPushNotifications({
     // Specifies which notifications to receive
            types: [
                Ti.Network.NOTIFICATION_TYPE_BADGE,
                Ti.Network.NOTIFICATION_TYPE_ALERT,
                Ti.Network.NOTIFICATION_TYPE_SOUND
            ],
            success: deviceTokenSuccess,
            error: deviceTokenError,
            callback: receivePush
        });
    }
    // Process incoming push notifications
    function receivePush(e) {
        console.log('Received push: ' + JSON.stringify(e));
    }
    // Save the device token for subsequent API calls
    function deviceTokenSuccess(e) {
        deviceToken = e.deviceToken;
    }
    function deviceTokenError(e) {
        console.log('Failed to register for push notifications! ' + e.error);
    }

    // Occurs when the app opens back up
     Ti.App.addEventListener('resume',function(e){
        if (Ti.App.Properties.getBool('completedRide')) {
            if (Ti.App.Properties.getList('polyline')) 
                windowController.goToFreeRideWindow(MapModule.createRoute({points: Ti.App.Properties.getList('polyline'), color: 'blue', width: 4}));
            else 
                windowController.goToFreeRideWindow();
        } else {
            directionController.mapComponentController.showCurrentLocation();
            // Update location
        }
    });

    Ti.App.iOS.addEventListener('notification', function(e) {
        if (e.userInfo && "id" in e.userInfo){
            Ti.App.Properties.setObject('timeEndActual', new Date());
        }
        // Reset badge number to nothing
        if (e.badge > 0) {
            Ti.App.iOS.scheduleLocalNotification({
                date: new Date(new Date().getTime()),
                badge: -1
            });
        }
    });
};
