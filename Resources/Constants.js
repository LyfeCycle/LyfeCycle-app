module.exports.backendURL = 'http://lyfecycle-api.herokuapp.com/';


// Device Stats
module.exports.deviceWidth = Titanium.Platform.displayCaps.platformWidth;
module.exports.deviceHeight = Titanium.Platform.displayCaps.platformHeight;

// Global Constants
module.exports.fontKG = 'KGHAPPY';
module.exports.fontMillion = 'THE MILLION MILE MAN';
module.exports.standardFont = module.exports.fontKG;
module.exports.green = '#9ae588';
module.exports.darkGreen = '#89d477';
module.exports.cream = '#F1ECD6';
module.exports.topBarHeight = '12%';
module.exports.viewHeight = '88%';

// HomeView
module.exports.homeViewButtonWidth = module.exports.deviceWidth * 0.8;
module.exports.bannerHeight = 110;

// DirectionsController
module.exports.GoogleDirectionsStartReq = 'https://maps.googleapis.com/maps/api/directions/json?origin=';
module.exports.GoogleDirectionsEndReq = '&key=' + APIConstants.GoogleDirectionsKey + '&avoid=highways&mode=bicycling&sensor=false';

// MapComponent
module.exports.mapComponentHeight = '70%';
module.exports.mapComponentHeightNegative = '-70%';

// module.exports.standardFont = module.exports.fontMillion;