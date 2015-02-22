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

windowController.goToHomeWindow();



