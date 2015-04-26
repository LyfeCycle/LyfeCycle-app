/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Crash_Detect
 *
 * * * * * * * * * * * * * * * * * * * * */

// Crash Detection using Core Motion
var CoreMotion = require('ti.coremotion');

var accelX = accelY = accelZ = 0;
var lastX = lastY = lastZ = 0;
var CRASH_THRESHOLD = 2;

function CrashDetect() {

    if (CoreMotion.isAccelerometerAvailable()) {
        // Start the service
        accelerometer_state = true;
        // Send data at 1 s (1000 ms) intervals
        CoreMotion.setAccelerometerUpdateInterval(1000);
        // Start with a callback
        CoreMotion.startAccelerometerUpdates(updateAccelData);
    }
}

function updateAccelData (e) {
    
    if (e.success) {     
        var data = e.acceleration;
        if (Math.abs(lastX - data.x) > CRASH_THRESHOLD || Math.abs(lastY - data.y) > CRASH_THRESHOLD || Math.abs(lastY - data.y) > CRASH_THRESHOLD) {
            accelX++;

            // Run alert process
            crashAlert();            
        }

        lastX = data.x;
        lastY = data.y;
        lastZ = data.z;

        // Attitude = measurement of orientation of a device
        data = e.attitude;
        
    } else {
        if (e.error) Ti.API.error(e.error);
    }
}

function crashAlert() {
    
    // Display an alert dialog that is cancellable
    var dialog = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: ['Confirm', 'Cancel'],
        message: 'Cancel crash alert',
        title: 'Crash Alert'
    });
    dialog.addEventListener('click', function(e){
        if (e.index === e.source.cancel){
          Ti.API.info('The cancel button was clicked');
    }
        Ti.API.info('e.cancel: ' + e.cancel);
        Ti.API.info('e.source.cancel: ' + e.source.cancel);
        Ti.API.info('e.index: ' + e.index);
    });
    dialog.show();

    // Notify emergency contacts and personnel
    // Currently it is only an email...
    var emailDialog = Ti.UI.createEmailDialog();
    emailDialog.subject = "Crash Detected for Rider";
    emailDialog.toRecipients = ['contact@lyfecycle.me'];
    //emailDialog.messageBody = '<b>Alex Wong may have been in an accident at location</b>' + coordinates;
    emailDialog.messageBody = '<b>Rider may have been in an accident at location</b>';
    emailDialog.open();

    // Add crash information to database
    var xhr = Ti.Network.createHTTPClient();

    xhr.onload = function(e) {
        // handle response, which at minimum will be an HTTP status code
    };
    xhr.open('POST','http://lyfecycle-api.herokuapp.com/locations');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send({
        name:'Rider has crashed',
        //longitude: coordinates[0],
        //latitude: coordinates[1]
    });
}

module.exports = CrashDetect;