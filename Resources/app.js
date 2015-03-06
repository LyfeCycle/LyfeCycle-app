var MapModule = require('ti.map');

// ***** View Requires *****
var APIConstants = require('./APIConstants');
var Constants = require('./Constants');
var HomeMenuView = require('/views/HomeMenuView');
var DirectionView = require('/views/DirectionView');
var LoginView = require('/views/LoginView');
var TopBarView = require('/views/TopBarView');
var EnableLocationView = require('/views/EnableLocationServicesView');
var SocialView = require('/views/SocialView');
var SideMenuView = require('/views/SideMenuView');
var ReportView = require('/views/ReportView');

// ***** Controller Requires *****
var SessionController = require('/controllers/SessionController');
var CrashDetectController = require('/controllers/CrashDetectController');
var WindowController = require('/controllers/WindowController');
var GPSLocationController = require('/controllers/GPSLocationController');
var DirectionController = require('/controllers/DirectionController');
var SocialController = require('/controllers/SocialController');
var SideMenuController = require('/controllers/SideMenuController');
var ReportController = require('/controllers/ReportController');

// ***** Model Requires *****
var StepModel = require('/models/StepModel');
var IncidentTypeModel = require('/models/IncidentTypeModel');

// ***** View Objects *****
var homeMenuView = new HomeMenuView();
var directionView = new DirectionView();
var loginView = new LoginView();
var topBar = new TopBarView();
var enableLocationView = new EnableLocationView();
var socialView = new SocialView();
var sideMenuView = new SideMenuView();
var reportView = new ReportView();

// ***** Controller Objects *****
var sessionController = new SessionController();
var crashDetectController = new CrashDetectController();
var gpsLocationController = new GPSLocationController();
var directionController = new DirectionController();
var socialController = new SocialController();
var sideMenuController = new SideMenuController();
var reportController = new ReportController();
var windowController = new WindowController();


// Uncomment the next line to test Login Screen
var usedBefore = Ti.App.Properties.getBool('usedBefore');
if (Ti.Geolocation.locationServicesEnabled) {	
	gpsLocationController.initGPS();
	if (usedBefore){
		Ti.App.Properties.setBool('usedBefore', true);
		sessionController.Login();
	} else windowController.goToHomeWindow();
} else {
    windowController.goToEnableLocationWindow();
}