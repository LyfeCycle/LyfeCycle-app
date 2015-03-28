var MapModule = require('ti.map');

var fb = require('facebook');
fb.appid = 382800148589176;
fb.permissions = ['publish_stream'];

// ***** View Requires *****
var APIConstants = require('./APIConstants');
var Settings = require('./Settings');
var Constants = require('./Constants');
var HomeMenuView = require('/views/HomeMenuView');
var DirectionView = require('/views/DirectionView');
var LoginView = require('/views/LoginView');
var TopBarView = require('/views/TopBarView');
var EnableLocationView = require('/views/EnableLocationServicesView');
var SocialView = require('/views/SocialView');
var SideMenuView = require('/views/SideMenuView');
var FreeRideView = require('/views/FreeRideView');

// ***** Controller Requires *****
var SessionController = require('/controllers/SessionController');
var CrashDetectController = require('/controllers/CrashDetectController');
var WindowController = require('/controllers/WindowController');
var GPSLocationController = require('/controllers/GPSLocationController');
var DirectionController = require('/controllers/DirectionController');
var SocialController = require('/controllers/SocialController');
var SideMenuController = require('/controllers/SideMenuController');
var FreeRideController = require('/controllers/FreeRideController');
var RouteController = require('/controllers/RouteController');

// ***** Model Requires *****
var StepModel = require('/models/StepModel');
var IncidentTypeModel = require('/models/IncidentTypeModel');
var ManeuverModel = require('/models/ManeuverModel');

// ***** Client Requires *****
var IncidentClient = require('/clients/IncidentClient');
var UserClient = require('/clients/UserClient');

// ***** View Objects *****
var homeMenuView = new HomeMenuView();
var directionView = new DirectionView();
var loginView = new LoginView();
var topBar = new TopBarView();
var enableLocationView = new EnableLocationView();
var socialView = new SocialView();
var sideMenuView = new SideMenuView();
var freeRideView = new FreeRideView();

// ***** Controller Objects *****
var sessionController = new SessionController();
var crashDetectController = new CrashDetectController();
var gpsLocationController = new GPSLocationController();
var directionController = new DirectionController();
var socialController = new SocialController();
var sideMenuController = new SideMenuController();
var freeRideController = new FreeRideController();
var routeController = new RouteController();
var windowController = new WindowController();

// ***** Clients Objects *****
var incidentClient = new IncidentClient();
var userClient = new UserClient();

// Uncomment the next line to test Login Screen
var usedBefore = Ti.App.Properties.getBool('usedBefore');
usedBefore = true;
if (Ti.Geolocation.locationServicesEnabled) {	
	gpsLocationController.initGPS();
	if (usedBefore){
		Ti.App.Properties.setBool('usedBefore', true);
		sessionController.Login();
		// windowController.goToHomeWindow();
	} else windowController.goToHomeWindow();
} else {
    windowController.goToEnableLocationWindow();
}