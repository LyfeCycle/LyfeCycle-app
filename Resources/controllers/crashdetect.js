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
            alert("Crash detected!");
            var emailDialog = Ti.UI.createEmailDialog();
            emailDialog.subject = "Crash Detected for Alex Wong";
            emailDialog.toRecipients = ['contact@lyfecycle.me'];
            emailDialog.messageBody = '<b>Alex Wong may have been in an accident at location</b>' + coordinates;
            emailDialog.open();
            ///// Upload point to api
            var xhr = Ti.Network.createHTTPClient();

            xhr.onload = function(e) {
                console.log('onload');
                console.log('response: ' + this.responseText);
                //handle response, which at minimum will be an HTTP status code
            };
            xhr.open('POST','http://lyfecycle-api.herokuapp.com/locations');
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send({
                name:'Alex Crashed',
                longitude: coordinates[0],
                latitude: coordinates[1]
            });
        }
        lastX = data.x;
        lastY = data.y;
        lastZ = data.z;

        data = e.attitude;
        
    } else {
        if (e.error) Ti.API.error(e.error);
    }
}

module.exports = CrashDetect;