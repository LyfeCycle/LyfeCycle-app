// ***** View Objects *****
var Map = require('/views/map');
var mainMap = new Map();



// ***** Controller Objects *****
var Session = require('/controllers/session');
var userSession = new Session();
var CrashDetect = require('/controllers/crashdetect');
var userCrashDetect = new CrashDetect();


// ***** Windows *****

// Main Window -------------------------------
var main = Titanium.UI.createWindow();

var mainWindowMapView = mainMap.getMapView();

main.add(mainWindowMapView);
main.open();

// Settings Window ---------------------------
var settings = Titanium.UI.createWindow();


// Login Window ------------------------------
var login = Titanium.UI.createWindow();



// If not logged in, open Login window
if (userSession.getLoginState == false) {
	login.open();
}

