// ***** View Objects *****
var Map = require('/views/map');
var mainMap = new Map();


// Main Window -------------------------------
var main = Titanium.UI.createWindow();

var mainWindowMapView = mainMap.getMapView();

main.add(mainWindowMapView);
main.open();

// Settings Window ---------------------------
var settings = Titanium.UI.createWindow();


// Login Window ------------------------------
var login = Titanium.UI.createWindow();

if (logged_in_state = false) {
	login.open();
}

// If not logged in, open Login window
