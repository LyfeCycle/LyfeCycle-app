// ***** View Requires *****
var Map = require('/views/MapView');
var HomeMenuView = require('/views/HomeMenuView');

// ***** Controller Requires *****
var Session = require('/controllers/SessionController');
var CrashDetect = require('/controllers/CrashDetectController');
var WindowController = require('/controllers/WindowController');


// ***** Controller Objects *****
var userSession = new Session();
var userCrashDetect = new CrashDetect();
var windowController = new WindowController();

// ***** View Objects *****
var map = new Map();
var homeMenu = new HomeMenuView();

// ***** Windows *****

// Main Window -------------------------------
// The main Window is opened upon opening the app.
// the Window controller controls all other window switching
windowController.goToMain();



