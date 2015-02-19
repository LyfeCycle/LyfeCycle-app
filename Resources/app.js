// ***** View Requires *****
var Map = require('/views/MapView');
var HomeView = require('/views/HomeView');

// ***** Controller Requires *****
var Session = require('/controllers/SessionController');
var CrashDetect = require('/controllers/CrashDetectController');
var WindowController = require('/controllers/WindowController');


// ***** Controller Objects *****
var userSession = new Session();
var userCrashDetect = new CrashDetect();
var windowController = new WindowController();


windowController.goToMain();


/*
// ***** Windows *****

// Main Window -------------------------------
// The main Window is opened upon opening the app.
// the Window controller controls all other window switching
var main = Titanium.UI.createWindow();

var mainWindowMapView = mainMap.getMapView();

// main.add(mainWindowMapView);
main.add(homeView.main);
main.open();


// Login Window ------------------------------
var login = Titanium.UI.createWindow();


// If not logged in, open Login window
if (userSession.getLoginState == false) {
	login.open();
}

// Settings Window ---------------------------
var settings = Titanium.UI.createWindow();

*/




