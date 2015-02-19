// ***** Controller Requires *****
var WindowController = require('controllers/WindowController');
var Session = require('/controllers/Session');
var CrashDetect = require('/controllers/CrashDetect');


// ***** Controller Objects *****
var userSession = new Session();
var userCrashDetect = new CrashDetect();
var windowController = new WindowController();


// ***** Windows *****

// Main Window -------------------------------
// The main Window is opened upon opening the app.
// the Window controller controls all other window switching
windowController.goToMain();



