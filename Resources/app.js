// ***** View Requires *****
var Map = require('/views/map');
var HomeView = require('/views/HomeView');

// ***** Controller Requires *****
var Session = require('/controllers/session');
var CrashDetect = require('/controllers/crashdetect');


// ***** View Objects *****
var mainMap = new Map();
var homeView = new HomeView();

// ***** Controller Objects *****
var userSession = new Session();
var userCrashDetect = new CrashDetect();


// ***** Windows *****

// Main Window -------------------------------
var main = Titanium.UI.createWindow();

var mainWindowMapView = mainMap.getMapView();

// main.add(mainWindowMapView);
main.add(homeView.main);
main.open();

// Settings Window ---------------------------
var settings = Titanium.UI.createWindow();


// Login Window ------------------------------
var login = Titanium.UI.createWindow();



// If not logged in, open Login window
if (userSession.getLoginState == false) {
	login.open();
}

