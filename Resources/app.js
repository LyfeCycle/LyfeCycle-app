// ***** View Requires *****
var HomeMenuView = require('/views/HomeMenuView');
var DirectionView = require('/views/DirectionView');

// ***** Controller Requires *****
var Session = require('/controllers/SessionController');
var CrashDetect = require('/controllers/CrashDetectController');
var WindowController = require('/controllers/WindowController');

// ***** View Objects *****
var homeMenuView = new HomeMenuView();
var directionView = new DirectionView();

// ***** Controller Objects *****
var userSession = new Session();
var userCrashDetect = new CrashDetect();
var windowController = new WindowController();

windowController.goToHomeView();


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




