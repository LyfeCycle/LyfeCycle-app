// ***** GPS *****
var MapModule = require('ti.map');
var GPSLocationController = require('/controllers/GPSLocationController');
var gpsLocationController = new GPSLocationController();
if (Ti.Geolocation.locationServicesEnabled) {
		gpsLocationController.initGPS();
} else {
    windowController.goToEnableLocationWindow();
}

// ***** Facebook *****
var fb = require('facebook');
fb.appid = 382800148589176;
fb.permissions = ['public_profile'];

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
var FreeRideView = require('/views/FreeRideView');
var ProfileView = require('/views/ProfileView');

// ***** Controller Requires *****
var SessionController = require('/controllers/SessionController');
var CrashDetectController = require('/controllers/CrashDetectController');
var WindowController = require('/controllers/WindowController');
var DirectionController = require('/controllers/DirectionController');
var SocialController = require('/controllers/SocialController');
var SideMenuController = require('/controllers/SideMenuController');
var FreeRideController = require('/controllers/FreeRideController');
var RouteController = require('/controllers/RouteController');
var NotificationsController = require('/controllers/NotificationsController');
var IncidentController = require('/controllers/IncidentController');
var SettingsController = require('/controllers/SettingsController');

// ***** Model Requires *****
var StepModel = require('/models/StepModel');
var IncidentTypeModel = require('/models/IncidentTypeModel');
var ManeuverModel = require('/models/ManeuverModel');

// ***** Client Requires *****
var IncidentClient = require('/clients/IncidentClient');
var UserClient = require('/clients/UserClient');

// ***** Clients Objects *****
var incidentClient = new IncidentClient();
var userClient = new UserClient();

// ***** View Objects *****
var homeMenuView = new HomeMenuView();
var directionView = new DirectionView();
var loginView = new LoginView();
var topBar = new TopBarView();
var enableLocationView = new EnableLocationView();
var socialView = new SocialView();
var sideMenuView = new SideMenuView();
var freeRideView = new FreeRideView();
var profileView = new ProfileView();

// ***** Controller Objects *****
var sessionController = new SessionController();
var crashDetectController = new CrashDetectController();
var directionController = new DirectionController();
var socialController = new SocialController();
var sideMenuController = new SideMenuController();
var freeRideController = new FreeRideController();
var routeController = new RouteController();
var incidentController = new IncidentController();
var settingsController = new SettingsController();
var windowController = new WindowController();

// Register the background service
Ti.App.iOS.registerBackgroundService({url:'/controllers/RouteControllers/BackgroundRouteController.js'});
NotificationsController.registerForPush();

// After initialization, initialize login process
var usedBefore = Ti.App.Properties.getBool('usedBefore');
usedBefore = true;

if (usedBefore){
		Ti.App.Properties.setBool('usedBefore', true);
		sessionController.Login();
		// windowController.goToHomeWindow();
} else windowController.goToHomeWindow();

